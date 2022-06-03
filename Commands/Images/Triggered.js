const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "triggered",
    usage: ["Edita una imagen del tipo Triggered con el avatar de alguien ```{prefix}changemymind <@usuario>```"],
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
            const user = message.mentions.members.first();
    if (!user) {
        const avatar = message.author.displayAvatarURL({ size: 2048, format: "png" });

        await message.reply({
          files: [
            {
              attachment: `https://some-random-api.ml/canvas/triggered?avatar=${avatar}`,
              name: "triggered.jpg",
            },
          ],
        });
    }
    const avatar = user.user.displayAvatarURL({ size: 2048, format: "png" });

    await message.reply({
      files: [
        {
          attachment: `https://some-random-api.ml/canvas/triggered?avatar=${avatar}`,
          name: "file.jpg",
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