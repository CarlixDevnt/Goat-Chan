const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "changemymind",
    usage: ["Edita una imagen del tipo Change My Mind ```{prefix}changemymind <texto>```"],
    enabled: true,
    aliases: [],
    category: "Imágenes",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],


    nsfw: false,
    partnerOnly: true,
    ownerOnly: false,
    cooldown: 5000,


    async execute(client, message, args, data){
        try{
            const text = args.join("+");
      if (!text) {
        const error = new MessageEmbed()
      .setTitle("❌ • Error de parámetros")
      .setDescription("Debes especificar un argumento como texto")
      .setColor("RED")
      return message.reply({ embeds: [error] })
      }
      message.reply({
        files: [
          {
            attachment: `https://vacefron.nl/api/changemymind?text=${text}`,
            name: "changemymind.png",
          },
        ],
      });
        }catch(err){
            client.logger.error(`Algo ha fallado al usar el comando ${data.cmd.name}`)
            console.log(err)
            const errorKaboom = new MessageEmbed()
                .setTitle("❌ · Algo raro ha pasado")
                .setDescription(`No se ha podido ejecutar este comando. Vuelve a intentarlo; y si esto sigue pasando, avisa a un desarrollador.`)
                .addField("Error log", `\`\`\`${err}\`\`\``)
                .setColor("RED")
            return message.reply({ embeds: [errorKaboom] })
        }
    }
}