const { MessageEmbed } = require("discord.js")
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: "laugh",
    usage: ["Ríete ```{prefix}laugh ```"],
    enabled: true,
    aliases: [],
    category: "Reacciones",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const img = await nekoapi.reaction.laugh()
        let mention = message.mentions.members.first()
    if(!mention) {
      const embed = new MessageEmbed()
      .setDescription(`**${message.author.username}** está riendo`)
      .setColor("RANDOM")
      .setImage(img.url)
      message.channel.send({ embeds: [embed] })
    } else {
      if(mention.user.id === message.author.id) {
        const embed = new MessageEmbed()
      .setDescription(`**${message.author.username}** está riendo`)
      .setColor("RANDOM")
      .setImage(img.url)
      message.channel.send({ embeds: [embed] })
      }
      if(mention.user.id === "637421092264476675") {
        const embed = new MessageEmbed()
        .setDescription(`Riámonos junt@s, **${message.author.username}**...`)
        .setColor("RANDOM")
        .setImage(img.url);
        message.channel.send({ embeds: [embed] })
      }
      if(mention.user.id !== message.author.id && mention.user.id !== "637421092264476675") {
        const embed = new MessageEmbed()
        .setDescription(`**${message.author.username}** se ha puesto a reír con **${mention.user.username}**`)
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