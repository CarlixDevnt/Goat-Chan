const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "leveling",
    usage: ["Cambia los ajustes del sistema de niveles", "Activa los niveles ```{prefix}leveling enable```", "Desactiva los niveles ```{prefix}leveling disable```", "Elige un canal para anunciar las subidas de nivel ```{prefix}leveling channel <#canal>```", "Crea un mensaje personalizado ```{prefix}leveling message <mensaje>```"],
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

            if(!data.guild.plugins.leveling){
                data.guild.plugins.leveling = { enabled: false, channel:  "", reactions: true }
                data.guild.markModified('plugins.leveling');
                await data.guild.save();
            };

            if(args[0].toLowerCase() === "disable"){
                data.guild.plugins.leveling.enabled = false;
                data.guild.markModified('plugins.leveling');
                await data.guild.save();
                const disabledleveling = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha desactivado el módulo de niveles")
                .setColor("GREEN");
            return message.reply({ embeds: [disabledleveling] })
            };

            if(args[0].toLowerCase() === "enable"){
                data.guild.plugins.leveling.enabled = true;
                data.guild.markModified('plugins.leveling');
                await data.guild.save();
                const enabledleveling = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha activado el módulo de niveles")
                .setColor("GREEN");
            return message.reply({ embeds: [enabledleveling] })
                
            };

            if(!args[1]){
                const errorNoArgs = new MessageEmbed()
                .setTitle("❌ • Algo ha fallado")
                .setDescription("Faltan parámetros que no has especificado en el mensaje")
                .setColor("RED");
                return message.reply({ embeds: [errorNoArgs] })
            };

            if(args[0].toLowerCase() === "channel"){
                
                let channel = await client.tools.resolveChannel(args[1], message.guild);
                if(!channel) {
                    const errorNoArgs = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No he podido encontrar ese canal en este servidor")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoArgs] })
                };

                
                data.guild.plugins.leveling.enabled = true;
                data.guild.plugins.leveling.levelMsgChannel = channel.id;
                data.guild.markModified('plugins.leveling');
                await data.guild.save();

                const setSGChannel = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`${channel} es el nuevo canal de niveles`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setSGChannel] })
            };

            if(args[0].toLowerCase() === "message"){
                let msg = args.slice(1).join(" ")
                if(!msg) {
                    const errorNoArgs = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No has especificado el mensaje")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoArgs] })
                };

                
                data.guild.plugins.leveling.enabled = true;
                data.guild.plugins.leveling.customMessage = msg;
                data.guild.markModified('plugins.leveling');
                await data.guild.save();

                const setSGChannel = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`Se ha cambiado el mensaje de subida de nivel`)
                    .addField("Preview", msg.replace("{username}", message.author.username).replace("{level}", "1"))
                    .setColor("GREEN");
                return message.reply({ embeds: [setSGChannel] })
            };
            
            let helpMeEmbed = new MessageEmbed()
            .setTitle("❓ • Necesitas ayuda?")
            .setDescription(`El comando \`leveling\` sirve para gestionar todo lo relacionado con las niveles, ya sea activarlos, desactivarlos o personalizar canales o mensajes de subida\nAquí tienes los esquemas de uso de este comando`)
            .addLabel(`Selecciona el canal de niveles`, "```{prefix}leveling channel #canal```")
            .addLabel(`Personaliza el mensaje de subida`, "```{prefix}leveling message mensaje```")
            .addLabel(`Activa los niveles`, "```{prefix}leveling enable```")
            .addLabel(`Desactiva los niveles`, "```{prefix}leveling disable```")
            .setColor("RED")
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