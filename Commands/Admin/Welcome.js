const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "welcome",
    usage: ["Cambia los ajustes de bienvenidas", "Configura el canal de bienvenidas ```{prefix}welcome set #channel```", "Crea un mensaje de despedida personalizado ```{prefix}welcome custom <text>```", "Desactiva el canal de bienvenidas ```{prefix}welcome disable```", "Haz una prueba de mensaje de despedida ```{prefix}welcome test```", "Variable disponibles: ```{user.ping} - @CarlixDev@9025 (con ping)\n{user.name} - CarlixPerz\n{user.id} - 607571230303977493\n{user.tag} - CarlixPerz#9025 (sin ping)\n{guild.name} - Nombre del servidor\n{guild.id} - ID del servidor\n{guild.totalUser} - Número de usuarios del servidor```"],
    enabled: true,
    aliases: ["join"],
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

            if(!data.guild.channels.welcome){
                data.guild.channels.welcome = { enabled: false, channel:  "", message: "", image: false, embed: false }
                data.guild.markModified('channels.welcome');
                await data.guild.save();
            };

            if(args[0].toLowerCase() === "disable"){
                data.guild.channels.welcome.enabled = false;
                data.guild.markModified('channels.welcome');
                await data.guild.save();
                const disabledWelcome = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha desactivado el módulo de bienvenidas")
                .setColor("GREEN");
            return message.reply({ embeds: [disabledWelcome] })
            };

            if(args[0].toLowerCase() === "test"){
                if(!data.guild.channels.welcome.enabled || data.guild.channels.welcome.channel.trim() === ""){
                    const errorNoSet = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No hay un canal de bienvenidas seleccionado donde hacer la prueba")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoSet] })
                }
                

                let channel = await client.tools.resolveChannel(data.guild.channels.welcome.channel, message.guild);
                let welcomeMsg = (data.guild.channels.welcome.message === null || data.guild.channels.welcome.message === "" || data.guild.channels.welcome.message === " ") ? "{user.ping} se ha ido del servidor..." : data.guild.channels.welcome.message; // Get the custom message or use the preset one
                

                let fmsg = await welcomeMsg
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

                
                data.guild.channels.welcome.enabled = true;
                data.guild.channels.welcome.channel = channel.id;
                data.guild.markModified('channels.welcome');
                await data.guild.save();

                const setWCChannel = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`${channel} es el nuevo canal de bienvenidas`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setWCChannel] })
            };

            
            if(args[0].toLowerCase() === "custom"){
                
                let msg = args.slice(1).join(" ");
                
                data.guild.channels.welcome.message = msg;
                data.guild.markModified('channels.welcome');
                await data.guild.save();

                const setWCMessage = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`Ahora, cuando alguien abandone el servidor, podré el siguiente texto:\n${msg}`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setWCMessage] })
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