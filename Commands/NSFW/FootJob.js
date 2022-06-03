const { MessageEmbed } = require("discord.js")
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: "footjob",
    usage: ["Con las patas... ```{prefix}footjob <@usuario>```"],
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
              const img = await nekoapi.rolplay_nsfw.feetjob()
      let mention = message.mentions.members.first()
    if(!mention) {
      message.channel.send("Debes mencionar a una persona para... bueno, eso")
    } else {
      if(mention.user.id === message.author.id) {
        message.channel.send("No creo que seas tan flexible para poder hacer eso")
      }
      if(mention.user.id === "637421092264476675") {
        message.channel.send("Pero... es pronto para hacerlo...")
      }
      if(mention.user.id !== message.author.id && mention.user.id !== "637421092264476675") {
          const embed = new MessageEmbed()
        .setDescription(`**${message.author.username}** usa los pies para masajeársela a **${mention.user.username}**`)
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