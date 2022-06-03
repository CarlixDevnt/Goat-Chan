const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "dice",
    usage: ["Tira un dado ```{prefix}dice```"],
    enabled: true,
    aliases: [],
    category: "Diversión",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            let value = Math.floor(Math.random() * 6 + 1)
            const result = new MessageEmbed()
                .setTitle(`🎲 • ${message.author.username} ha lanzado un dado`)
                .setDescription(`El resultado ha sido... **${value}**!`)
                .setColor("RANDOM")
                return message.reply({ embeds: [result] })
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