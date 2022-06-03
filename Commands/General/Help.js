const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")

module.exports = {
    name: "help",
    usage: ["Obtén información general sobre Goat-Chan ```{prefix}help```", "Obtén información específica sobre un comando ```{prefix}help <command>```"],
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
            let cmd = args[0] ? (await client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()))) : null;
            if(cmd){
                let aliaseList = (cmd.aliases.length < 1) ? "Ninguno" : cmd.aliases.join("\n")
                const helpCommand = new MessageEmbed()
                .setAuthor(`• Menú de ayuda de Goat-Chan`, message.client.user.displayAvatarURL())
                .setColor("#3dffec")
                .setTitle(`**Comando __${cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1)}__**`)
                .addField("Descripción y esquema de uso", `${cmd.usage.map(x => x.replace(/{prefix}/g, data.guild.prefix)).join("\n")}`)
                .addField("Alias disponibles", `${aliaseList}`)
                .addField("Cooldown", `${cmd.cooldown / 1000} segundos`)
                .addField("Regulaciones", `__NSFW__: ${(!cmd.nsfw) ? "No" : "Sí"}\n__Exclusivo para Partners__: ${(!cmd.partnerOnly) ? "No" : "Sí"}`)
                return message.reply({ embeds: [helpCommand] })
            }
            let buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setURL("https://discord.com/oauth2/authorize?client_id=637421092264476675&scope=bot%20applications.commands&permissions=2205280584")
                    .setEmoji("<:increased:926174056946999336>")
                    .setLabel("Invítame"),

                new MessageButton()
                    .setStyle("LINK")
                    .setURL("https://discord.gg/NSEC6mb6w5")
                    .setEmoji("<:employee:926162750038736936>")
                    .setLabel("Soporte")
            )

            const embed = new MessageEmbed()
                .setTitle("Hola, soy Goat-Chan")
                .setDescription("Soy la waifu de todo gallego, la mejor cabra del ganado y un bot multifuncional que hará de tu servidor un lugar más entretenido con mis comandos de diversión, interacción, utilidad...\n\n`Si quieres ver una lista completa con todos mis comandos, usa gc!commands`")
                .addField("Mis funciones", "Mi lista de 99 comandos (y más que van a llegar) incluye funcionalidades como comandos de entretenimiento, utilidad, interacción, generación de imágenes, minijuegos y otras funciones que llegarán en el futuro, como un sistema de niveles, y la corrección del sistema de moderación")
                .addField("Sistema Partner", "Acaso no has oído de mi sistema **Partner**? Te permite conseguir ciertos beneficios dentro del bot, y lo mejor es que es completamente __gratis__. Habla con mis desarrolladores para saber más")
                .addField("Mis desarrolladores", "CarlixPerz#9025", true)
                .setColor("#3dffec")
                .setFooter("Goat-Chan, v1.5.1")
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