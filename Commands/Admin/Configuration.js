//--- Módulos externos ---
const { MessageEmbed } = require("discord.js");

//--- Handler ---
module.exports = {
    name: "configuration",
    usage: ["Obtén la lista de configuraciones actual para este servidor", "Obtén la lista de configuraciones ```{prefix}configuration```"],
    enabled: true,
    aliases: ["config"],
    category: "Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //--- Ajustes ---
    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,
    //--- Ejecución ---
    async execute(client, message, args, data){
        try{
            let welcome = !data.guild.channels.welcome ? `+ Activado: No` : `+ Activado: Sí\n+ Canal: <#${data.guild.channels.welcome.channel}>\n+ Imagen: ${data.guild.channels.welcome.image}\n+ Embed: ${data.guild.channels.welcome.embed}`;
            let goodbye = !data.guild.channels.goodbye ? `+ Activado: No` : `+ Activado: Sí\n+ Canal: <#${data.guild.channels.goodbye.channel}>\n+ Imagen: ${data.guild.channels.goodbye.image}\n+ Embed: ${data.guild.channels.goodbye.embed}`;
            let suggestions = !data.guild.channels.suggestions ? `+ Activado: No` : `+ Activado: Sí\n+ Canal: <#${data.guild.channels.suggestions.channel}>\n+ Emojis: ${data.guild.channels.suggestions.emojis.up}${data.guild.channels.suggestions.emojis.down}`;
            let confessions = !data.guild.channels.confessions ? `+ Activado: No` : `+ Activado: Sí\n+ Canal: <#${data.guild.channels.confessions.channel}>\n+ Reacciones: ${!data.guild.channels.confessions.reactions ? "No" : "Sí"}`;
            const configMenu = new MessageEmbed()
            .setAuthor(`• Configuración de ${message.guild.name}`, message.guild.iconURL())
            .addField(`Prefix`, `${data.guild.prefix}`, true)
            .addField(`Bienvenidas`, welcome, true)
            .addfield(`Despedidas`, goodbye, true)
            .addField(`Sugerencias`, suggestions, true)
            .addField(`Confesiones`, confessions, true)
            .setColor("#d6d6d6")
            .setFooter("Puedes modificar la configuración mediante comandos individuales")

            return message.channel.send({ embeds: [configMenu] })

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