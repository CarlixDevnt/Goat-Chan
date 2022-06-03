const { MessageEmbed } = require("discord.js")
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: "fuck",
    usage: ["Sabes perfectamente lo que es... ```{prefix}fuck <@usuario>```"],
    enabled: true,
    aliases: [],
    category: "NSFW",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: true,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
              const img = await nekoapi.rolplay_nsfw.fuck()
      let mention = message.mentions.members.first()
    if(!mention) {
      message.channel.send("Debes mencionar a una persona para... bueno, eso")
    } else {
      if(mention.user.id === message.author.id) {
        message.channel.send("No creo que puedas hacer eso")
      } else if(mention.user.id === "637421092264476675") {
          if(data.user.ranks.partner === false) {
        message.channel.send("No puedes hacer eso")
          } else {
            let probability = Math.floor(Math.random() * 10000)
            if (probability === 9025) {
                const embed = new MessageEmbed()
                    .setDescription(`Hagámoslo sólo por esta vez, **${message.author.username}**`)
                    .setColor("RANDOM")
                    .setImage(img.url)
                    .setFooter("No tengo gifs NSFW propios");
                message.channel.send({ embeds: [embed] })
            } else {
                const embed = new MessageEmbed()
                    .setDescription(`N-no puedo hacer eso c-contigo...`)
                    .setColor("RANDOM");
                message.channel.send({ embeds: [embed] })
            }
          }
      } else {
          const embed = new MessageEmbed()
          .setDescription(`**${message.author.username}** se ha follado a **${mention.user.username}**`)
          .setColor("RANDOM")
          .setImage(img.url);
          message.channel.send({ embeds: [embed] })
      }
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