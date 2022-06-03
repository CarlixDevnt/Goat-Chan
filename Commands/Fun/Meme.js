const somethingRandom = require('some-random-cat').Random,
subreddits = [
    "ShitpostingLatam",
    "SpanishMeme",
    "orslokx",
    
]
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "meme",
    usage: ["Obtén un meme de algún subreddit aleatorio```{prefix}meme```"],
    enabled: true,
    aliases: ["memes"],
    category: "Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,


    async execute(client, message, args, data){
        try{

            let randomSubReddit = subreddits[Math.floor(Math.random() * subreddits.length)] 
            somethingRandom.getMeme(randomSubReddit).then(res => {
                const memeEmbed = new MessageEmbed()
                .setTitle(`[${res.title}](https://www.reddit.com/r/${randomSubReddit})`)
                .setImage(res.img)
                .setColor("RANDOM")
                .setFooter(`Meme de ${res.author}`)
                return message.channel.send({ embeds: [memeEmbed] })
            }).catch(err => console.log(err));

        }catch(err){
            client.logger.error(`Algo ha fallado al usar el comando ${data.cmd.name}`)
            console.log(err)
            const errorKaboom = new MessageEmbed()
                .setTitle("❌ • Algo raro ha pasado")
                .setDescription(`No se ha podido ejecutar este comando. Vuelve a intentarlo; y si esto sigue pasando, avisa a un desarrollador.`)
                .addField("Error log", `\`\`\`${err}\`\`\``)
                .setColor("RED")
            return message.reply({ embeds: [errorKaboom] })
        }
    }
}