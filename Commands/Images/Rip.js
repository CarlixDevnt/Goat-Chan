const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rip",
    usage: ["Edita una imagen de lápida con la foto de perfil de un usuario ```{prefix}changemymind <@usuario>```"],
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
        message.reply({
            files: [
              {
                attachment: `https://vacefron.nl/api/grave?user=${mention.user.avatarURL()}`,
                name: "rip.png",
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