const { MessageEmbed } = require("discord.js")
const randomAnimal = require('random-animals-api'); 

module.exports = {
    name: "fox",
    usage: ["Una foto de un zorro ```{prefix}fox```"],
    enabled: true,
    aliases: ["fundy"],
    category: "Imágenes",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 3000,

    async execute(client, message, args, data){
        try{
            randomAnimal.fox().then((fox) => {
                const embed = new MessageEmbed()
                  .setImage(fox)
                  .setColor("RANDOM")
                  .setDescription("🦊 • **Toma un zorro**");
                  message.reply({ embeds: [embed] });
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