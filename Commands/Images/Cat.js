const { MessageEmbed } = require("discord.js")
const randomAnimal = require('random-animals-api'); 

module.exports = {
    name: "cat",
    usage: ["Una foto de un gatito ```{prefix}cat```"],
    enabled: true,
    aliases: ["kitty"],
    category: "Imágenes",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 3000,

    async execute(client, message, args, data){
        try{
            randomAnimal.cat().then((cat) => {
            let posibility = Math.floor(Math.random() * 1000);
            if (posibility === 123) {
                const embed = new MessageEmbed()
                .setImage("https://media.discordapp.net/attachments/964599586448629860/965286650269823036/unnamed_2.jpg?width=663&height=663")
                .setColor("RANDOM")
                .setDescription("🐱🍰 • **Hey, es Capitán Gato**");
                message.reply({ embeds: [embed] });
            } else {
                
                const embed = new MessageEmbed()
                  .setImage(cat)
                  .setColor("RANDOM")
                  .setDescription("🐱 • **Toma un gatito**");
                  message.reply({ embeds: [embed] });
                  }
                })
        } catch(err) {
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