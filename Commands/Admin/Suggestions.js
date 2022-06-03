const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "suggestions",
    usage: ["Cambia los ajustes de sugerencias", "Configura el canal de sugerencias ```{prefix}suggestions set #channel```", "Desactiva el canal de sugerencias ```{prefix}suggestions disable```", "Haz una prueba de sugerencia ```{prefix}suggestions test```"],
    enabled: true,
    aliases: [],
    category: "Administración",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //--- Ajustes ---
    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,


    async execute(client, message, args, data){
        try{
            if(!args[0]){
                const errorNoArgs = new MessageEmbed()
            .setTitle("❌ • Algo ha fallado")
            .setDescription("No has especificado la acción a realizar")
            .setColor("RED");
        return message.reply({ embeds: [errorNoArgs] })
            };

            if(!data.guild.channels.suggestions){
                data.guild.channels.suggestions = { enabled: false, channel:  "", emojis: { up: "🔼", down: "🔽"}}
                data.guild.markModified('channels.suggestions');
                await data.guild.save();
            };

            if(args[0].toLowerCase() === "disable"){
                data.guild.channels.suggestions.enabled = false;
                data.guild.markModified('channels.suggestions');
                await data.guild.save();
                const disabledsuggestions = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha desactivado el módulo de sugerencias")
                .setColor("GREEN");
            return message.reply({ embeds: [disabledsuggestions] })
            };

            if(args[0].toLowerCase() === "enable"){
                if(data.guild.channels.suggestions.channel.trim() === "") {
                    const errorNoSet = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No hay un canal de sugerencias establecido. Activar así el módulo de sugerencias podría causar un error fatal.")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoSet] })
                } else {
                    data.guild.channels.suggestions.enabled = true;
                data.guild.markModified('channels.suggestions');
                await data.guild.save();
                const enabledSuggestions = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha activado el módulo de sugerencias")
                .setColor("GREEN");
            return message.reply({ embeds: [enabledSuggestions] })
                }
            };

            if(args[0].toLowerCase() === "test"){
                if(!data.guild.channels.suggestions.enabled || data.guild.channels.suggestions.channel.trim() === ""){
                    const errorNoSet = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No hay un canal de sugerencias seleccionado donde hacer la prueba")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoSet] })
                }
                

                let channel = await client.tools.resolveChannel(data.guild.channels.suggestions.channel, message.guild);
                let suggestionRandomMessageOptions = [
                    "Pongan más emojis",
                    "Hagan más eventos",
                    "Hagan una temática musical",
                    "Quiten a mudae, me ha robado lo poco que me quedaba de vida social"
                ];
                let suggestionRandomMessage = suggestionRandomMessageOptions[Math.floor(Math.random() * suggestionRandomMessageOptions.length)]
                
                let testEmbed = new MessageEmbed()
                    .setTitle(`💡 • Sugerencia de prueba de ${message.author.username}`)
                    .setDescription(suggestionRandomMessage)
                    .setColor("BLUE");
                return channel.send({ embeds: [testEmbed] }).then(async m => {
                    m.react(data.guild.channels.suggestions.emojis.up)
                    m.react(data.guild.channels.suggestions.emojis.down)
                });

            }
            
            if(!args[1]){
                const errorNoArgs = new MessageEmbed()
                .setTitle("❌ • Algo ha fallado")
                .setDescription("Faltan parámetros que no has especificado en el mensaje")
                .setColor("RED");
                return message.reply({ embeds: [errorNoArgs] })
            };

            
            if(args[0].toLowerCase() === "set"){
                
                let channel = await client.tools.resolveChannel(args[1], message.guild);
                if(!channel) {
                    const errorNoArgs = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No he podido encontrar ese canal en este servidor")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoArgs] })
                };

                
                data.guild.channels.suggestions.enabled = true;
                data.guild.channels.suggestions.channel = channel.id;
                data.guild.markModified('channels.suggestions');
                await data.guild.save();

                const setSGChannel = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`${channel} es el nuevo canal de sugerencias`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setSGChannel] })
            };
            
            let helpMeEmbed = new MessageEmbed()
            .setTitle("❓ • Necesitas ayuda?")
            .setDescription(`El comando \`suggestions\` sirve para gestionar todo lo relacionado con las sugerencias, ya sea activarlas, desactivarlas, probarlas o personalizarlas\nAquí tienes los esquemas de uso de este comando`)
            .addField(`Selecciona el canal de sugerencias`, "```{prefix}suggestions set #channel```")
            .addField(`Activa las sugerencias`, "```{prefix}suggestions enable```")
            .addField(`Desactiva las sugerencias`, "```{prefix}suggestions disable```")
            .addField(`Prueba las sugerencias para ver si funcionan correctamente`, "```{prefix}suggestions test```")

            return message.reply({ embeds: [helpMeEmbed] });

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