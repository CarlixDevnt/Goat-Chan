const { MessageEmbed } = require("discord.js")
const fetch = require('node-fetch');

module.exports = {
    name: "trumptweet",
    usage: ["Edita una imagen para que parezca un tweet de trump ```{prefix}trumptweet <texto>```"],
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
            const text = args.join("+");
      const tweet = args.join(" ");
    if (!tweet) {
      const error = new MessageEmbed()
      .setTitle("❌ • Error de parámetros")
      .setDescription("Debes especificar un argumento como texto para el tweet")
      .setColor("RED")
      return message.reply({ embeds: [error] })
    } else {
        if (tweet.length > 68) tweet = tweet.slice(0, 65) + "...";

        const res = await fetch(
            "https://nekobot.xyz/api/imagegen?type=trumptweet&text=" + tweet
          );
          const img = (await res.json()).message;
          message.reply({
            files: [{ attachment: img, name: "trumptweet.png" }],
          });
    }
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