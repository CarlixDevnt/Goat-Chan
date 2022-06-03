const { MessageEmbed } = require("discord.js")
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: "ahegao",
    usage: ["Me hace la cara de ahegao... ```{prefix}ahegao```"],
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
                const img = await nekoapi.nsfw.ahegao()
        const embed = new MessageEmbed()
        .setDescription(`Aquí tienes tu foto ahegao, **${message.author.username}**`)
        .setColor("RANDOM")
        .setImage(img.url);
        message.channel.send({ embeds: [embed] })

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