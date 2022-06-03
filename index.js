const Discord = require('discord.js'),
fs = require('fs'),
mongoose = require('mongoose'),
util = require('util'),
config = require('./config.json'),
readdir = util.promisify(fs.readdir);

client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'DIRECT_MESSAGES']});

client.event = new Discord.Collection();
client.commands = new Discord.Collection();
client.slash = new Discord.Collection();
client.config = config;
client.Database = require('./Database/Mongoose.js');
client.tools = require('./Tools/Tools.js');
client.logger = require('./Tools/Logger.js');

async function init(){
    // Carga eventos
    const eventFiles = fs.readdirSync('./Events/').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
    const event = require(`./Events/${file}`);
    const eventName = file.split(".")[0];
    console.log(`Cargando... ${eventName}`)
    client.on(eventName, event.bind(null, client));
    }

    // Carga comandos
    let folders = await readdir("./Commands/");
    folders.forEach(direct =>{
    const commandFiles = fs.readdirSync('./Commands/' + direct + "/").filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./Commands/${direct}/${file}`);
        client.commands.set(command.name, command);
    }
    })

    // Carga slash
    let slashArray = []
    let slashFolders = await readdir("./SlashCommands/");
    slashFolders.forEach(direct =>{
    const commandFiles = fs.readdirSync('./SlashCommands/' + direct + "/").filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./SlashCommands/${direct}/${file}`);
        client.slash.set(command.name, command);
        slashArray.push(command)
    }
    })
    client.on("ready", async() => {
        await client.application.commands.set(slashArray)
    })

    mongoose.connect(config.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log('Unable to connect to MongoDB Database.\nError: ' + err)
    })

    await client.login(config.token)
}

init();

process.on('unhandledRejection', err =>{
    console.log('Unknown error occured:\n')
    console.log(err)
})
