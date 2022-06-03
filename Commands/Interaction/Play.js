const { MessageEmbed } = require("discord.js")
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: "play",
    usage: ["Bueno, vamo a juga ```{prefix}play ```"],
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
            const img = await nekoapi.action.play()
    let messages = [`**${message.author.username}** se puso a jugar a la play`, `**${message.author.username}** está jugando a un videojuego`, `**${message.author.username}** ha procedido a disfrutar de un mundo de diversión ilimitada`];
    let embedMsg = messages[Math.floor(Math.random() * messages.length)];
    const embed = new MessageEmbed()
    .setDescription(embedMsg)
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