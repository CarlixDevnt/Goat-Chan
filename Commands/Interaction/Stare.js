const { MessageEmbed } = require("discord.js")
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: "stare",
    usage: ["Mira fijamente a alguien ```{prefix}stare <@user>```"],
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
            const img = await nekoapi.action.stare()
            let mention = message.mentions.members.first()
            if(!mention) {
              message.channel.send("Si no mencionas a nadie, supongo que mirarás fijamente al sol")
            } else {
              if(mention.user.id === message.author.id) {
                message.channel.send("Para intimidar a alguien debes mencionarlo, no?")
              }
              if(mention.user.id === "637421092264476675") {
                const embed = new MessageEmbed()
                .setDescription(`Me pones n-nerviosa, **${message.author.username}**...`)
                .setColor("RANDOM")
                .setImage(img.url);
                message.channel.send({ embeds: [embed] })
              }
              if(mention.user.id !== message.author.id && mention.user.id !== "637421092264476675") {
                const embed = new MessageEmbed()
                .setDescription(`**${message.author.username}** mira fijamente a **${mention.user.username}**`)
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