const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rate",
    usage: ["Valora algo sobre 10 ```{prefix}rate <algo>```"],
    enabled: true,
    aliases: [],
    category: "Diversión",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            let object = args.slice(0).join(' ');
            if(!object){
              const error = new MessageEmbed()
              .setTitle("❌ • Error de parámetros")
              .setDescription("Debes especificar un argumento como objeto a valorar")
              .setColor("RED")
              return message.reply({ embeds: [error] })
            } else {
            let randomnumber = Math.floor(Math.random() * 11);
              const embed = new MessageEmbed()
              .setDescription(`**❓ • Valoración sobre 10**\n**Objeto a valorar:** ${object}\n**Valoración:** ${randomnumber}/10`)
              .setColor("RANDOM");
              message.reply({ embeds: [embed] })
            }
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