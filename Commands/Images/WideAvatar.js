const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "wideavatar",
    usage: ["Edita el avatar de alguien para ponerlo más ancho ```{prefix}wideavatar <@usuario>```"],
    enabled: true,
    aliases: [],
    category: "Imágenes",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    //Settings for command
    nsfw: false,
    partnerOnly: true,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            const mention = message.mentions.members.first() || message.member;
    const avatar = mention.user.displayAvatarURL({
      dynamic: true,
      size: 2048,
      format: "png",
    });

    message.reply({
      files: [
        {
          attachment: `https://vacefron.nl/api/wide?image=${avatar}`,
          name: "wideavatar.png",
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