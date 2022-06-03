const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")

module.exports = {
    name: "invite",
    usage: ["Obtén el enlace de invitación de Goat-Chan ```{prefix}invite```"],
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
            let buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setURL("https://discord.com/oauth2/authorize?client_id=637421092264476675&scope=bot%20applications.commands&permissions=2205280584")
                    .setEmoji("<:increased:926174056946999336>")
                    .setLabel("O haz click aquí ;3"),
            )

            const embed = new MessageEmbed()
                .setTitle("Quieres invitarme a tu servidor?")
                .setDescription("Gracias! Con tu ayuda, podré llegar a muchos servidores y cumplir mi objetivo de hacer sonreír a cuanta más gente mejor")
                .addField("Link de invitación", "https://discord.com/oauth2/authorize?client_id=637421092264476675&scope=bot%20applications.commands&permissions=2205280584")
                .setColor("#3dffec")
                .setFooter("Goat-Chan, v1.5.0")
                .setThumbnail(client.user.avatarURL());

            message.channel.send({ embeds:[embed], components: [buttons] })
            
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