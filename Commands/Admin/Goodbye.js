const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "goodbye",
    usage: ["Cambia los ajustes de despedidas", "Configura el canal de despedidas ```{prefix}goodbye set #channel```", "Crea un mensaje de despedida personalizado ```{prefix}goodbye custom <text>```", "Desactiva el canal de despedidas ```{prefix}goodbye disable```", "Haz una prueba de mensaje de despedida ```{prefix}goodbye test```", "Variable disponibles: ```{user.ping} - @CarlixDev@9025 (con ping)\n{user.name} - CarlixPerz\n{user.id} - 607571230303977493\n{user.tag} - CarlixPerz#9025 (sin ping)\n{guild.name} - Nombre del servidor\n{guild.id} - ID del servidor\n{guild.totalUser} - Número de usuarios del servidor```"],
    enabled: true,
    aliases: ["leave"],
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

            if(!data.guild.channels.goodbye){
                data.guild.channels.goodbye = { enabled: false, channel:  "", message: "", image: false, embed: false }
                data.guild.markModified('channels.goodbye');
                await data.guild.save();
            };

            if(args[0].toLowerCase() === "disable"){
                data.guild.channels.goodbye.enabled = false;
                data.guild.markModified('channels.goodbye');
                await data.guild.save();
                const disabledGoodbye = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha desactivado el módulo de despedidas")
                .setColor("GREEN");
            return message.reply({ embeds: [disabledGoodbye] })
            };

            if(args[0].toLowerCase() === "test"){
                if(!data.guild.channels.goodbye.enabled || data.guild.channels.goodbye.channel.trim() === ""){
                    const errorNoSet = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No hay un canal de despedidas seleccionado donde hacer la prueba")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoSet] })
                }
                

                let channel = await client.tools.resolveChannel(data.guild.channels.goodbye.channel, message.guild);
                let goodbyeMsg = (data.guild.channels.goodbye.message === null || data.guild.channels.goodbye.message === "" || data.guild.channels.goodbye.message === " ") ? "{user.ping} se ha ido del servidor..." : data.guild.channels.goodbye.message; // Get the custom message or use the preset one
                

                let fmsg = await goodbyeMsg
                .replace("{user.ping}", `${message.author}`)
                .replace("{user.name}", `${message.author.username}`)
                .replace("{user.id}", `${message.author.id}`)
                .replace("{user.tag}", `${message.author.tag}`)
                .replace("{guild.name}", `${message.guild.name}`)
                .replace("{guild.id}", `${message.guild.id}`)
                .replace("{guild.totalUser}", `${message.guild.memberCount}`);
                
                return channel.send(fmsg);
            };

            
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

                
                data.guild.channels.goodbye.enabled = true;
                data.guild.channels.goodbye.channel = channel.id;
                data.guild.markModified('channels.goodbye');
                await data.guild.save();

                const setGBChannel = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`${channel} es el nuevo canal de despedidas`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setGBChannel] })
            };

            
            if(args[0].toLowerCase() === "custom"){
                
                let msg = args.slice(1).join(" ");
                
                data.guild.channels.goodbye.message = msg;
                data.guild.markModified('channels.goodbye');
                await data.guild.save();

                const setGBMessage = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`Ahora, cuando alguien abandone el servidor, podré el siguiente texto:\n${msg}`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setGBMessage] })
            };

            
            return client.embed.usage(message, data);

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