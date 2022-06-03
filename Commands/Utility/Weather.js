const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "weather",
    usage: ["Obtén información meteorológica sobre un lugar ```{prefix}weather <lugar>```"],
    enabled: true,
    aliases: [],
    category: "Utilidad",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            let place = args.slice(0).join("+")
            const link = `https://wttr.in/${place}.png?m`;
    const weblink = `https://wttr.in/${place}`;
    const embed = new Discord.MessageEmbed()
      .setTitle(`Previsión meteorológica a corto plazo para ${name}`)
      .setImage(link)
      .setFooter("Obtenido desde Wttr.in")
      .setColor("RANDOM");
    message.reply({ embeds: [embed] });
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