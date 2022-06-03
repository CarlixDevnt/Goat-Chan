const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    usage: ["Obtén mi ping actual ```{prefix}ping```"],
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const msg = await message.channel.send(`Calculando el ping...`);

            const pingEmbed = new MessageEmbed()
                .setTitle(':signal_strength: • Ping de Goat-Chan')
                .addField("Tiempo de respuesta", `${Math.floor(msg.createdAt - message.createdAt)}ms`, true)
                .addField("Latencia de la API", `${client.ws.ping}ms`, true)
                .setColor("RANDOM");

        await message.reply({ embeds: [pingEmbed] });

        }catch(err){
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