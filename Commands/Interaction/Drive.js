const { MessageEmbed } = require("discord.js")
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: "drive",
    usage: ["Ponte a conducir ```{prefix}drive ```"],
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
            const img = await nekoapi.action.drive()
    const embed = new MessageEmbed()
    .setDescription(`**${message.author.username}** está conduciendo, por favor, no es la fórmula 1, tómatelo con calma`)
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