const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "suggest",
    usage: ["Haz una sugerencia ```{prefix}suggest <texto>```"],
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
            if(data.guild.channels.suggestions.enabled === false) {
                const embed = new MessageEmbed()
                    .setTitle("❌ • No se puede hacer la sugerencia")
                    .setDescription("El módulo de sugerencias está desactivado")
                    .setColor("RED");
                    message.channel.send({ embeds: [embed] })
            } else {
                if(data.guild.channels.suggestions.channel.trim() === "") {
                    const errorNoSet = new MessageEmbed()
                            .setTitle("❌ • Algo ha fallado")
                            .setDescription("No hay un canal de sugerencias establecido")
                            .setColor("RED");
                        return message.reply({ embeds: [errorNoSet] })
                } else {
                    let channel = await client.tools.resolveChannel(data.guild.channels.suggestions.channel, message.guild);
    
                if(args) {
                    let suggestion = args.join(" ");
                    if(suggestion.length < 3) {
                        const errorNoSet = new MessageEmbed()
                            .setTitle("❌ • Algo ha fallado")
                            .setDescription("La sugerencia es demasiado corta")
                            .setColor("RED");
                        return message.reply({ embeds: [errorNoSet] })
                    } else {
                        message.reply("Se ha enviado tu sugerencia")
                    const embed = new MessageEmbed()
                        .setTitle(`💡 • Sugerencia de ${message.author.username}`)
                        .setDescription(`${args.join(" ")}`)
                        .setColor("BLUE");
                    channel.send({ embeds: [embed] }).then(async m => {
                    m.react("🔼")
                    m.react("🔽")
                })
                    }
                  } else {
                    const embed = new MessageEmbed()
              .setTitle("❌ • No se puede hacer la sugerencia")
              .setDescription("Debes escribir lo que quieras sugerir\n`Esquema de uso: gc!suggest <sugerencia>`")
              .setColor("RED");
              message.channel.send({ embeds: [embed] })
                  }
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