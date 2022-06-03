const { MessageEmbed } = require("discord.js")
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: "kiss",
    usage: ["Besa a alguien... ```{prefix}kiss <@user>```"],
    enabled: true,
    aliases: [],
    category: "Interacción",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const img = await nekoapi.action.kiss()
            let mention = message.mentions.members.first()
            if(!mention) {
              message.channel.send("Para besar a alguien, debes mencionarlo...")
            } else {
              if(mention.user.id === message.author.id) {
                message.channel.send("Supongo que el amor propio es importante")
              }
              if(mention.user.id === "637421092264476675") {
                message.channel.send("N-no puedo hacer eso...")
              }
              if(mention.user.id !== message.author.id && mention.user.id !== "637421092264476675") {
                const embed = new MessageEmbed()
                .setDescription(`**${message.author.username}** ha besado apasionadamente a **${mention.user.username}**... OwO`)
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