const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "ping",
    description: "Obtén mi latencia actual",
    enabled: true,
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    cooldown: 5000,


    async execute(client, interaction, args, data){
        try {
            const msg = await interaction.channel.send(`Calculando el ping...`);

            const pingEmbed = new MessageEmbed()
                .setTitle(':signal_strength: • Ping de Goat-Chan')
                .addField("Tiempo de respuesta", `${Math.floor(msg.createdAt - interaction.createdAt)}ms`, true)
                .addField("Latencia de la API", `${client.ws.ping}ms`, true)
                .setColor("RANDOM");

        await interaction.reply({ embeds: [pingEmbed] });

        msg.delete();
        }catch(err){
            console.log(err)
            const errorKaboom = new MessageEmbed()
                .setTitle("❌ • Algo raro ha pasado")
                .setDescription(`No se ha podido ejecutar este comando. Vuelve a intentarlo; y si esto sigue pasando, avisa a un desarrollador.`)
                .addField("Error log", `\`\`\`${err}\`\`\``)
                .setColor("RED")
            return interaction.reply({ embeds: [errorKaboom] })
        }
    }
}