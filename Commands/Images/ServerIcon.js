const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "servericon",
    usage: ["Obtén la imagen del servidor ```{prefix}servericon ```"],
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
            const server = message.guild;
    const embed = new MessageEmbed()
      .setTitle(`Imagen de ${message.guild.name}`)
      .setDescription(
        `[Icon Link](${server.iconURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })})`
      )
      .setImage(server.iconURL({ size: 2048, dynamic: true, format: "png" }))
      .setColor("RANDOM");
    message.reply({ embeds: [embed] });
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