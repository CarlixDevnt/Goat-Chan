const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "confessions",
    usage: ["Cambia los ajustes de confesiones", "Configura el canal de confesiones ```{prefix}confessions set #channel```", "Desactiva el canal de confesiones ```{prefix}confessions disable```", "Gestiona las reacciones aleatorias ```{prefix}confessions reactions <true/false>```", "Haz una prueba de confesión ```{prefix}confessions test```"],
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

            if(!data.guild.channels.confessions){
                data.guild.channels.confessions = { enabled: false, channel:  "", reactions: true }
                data.guild.markModified('channels.confessions');
                await data.guild.save();
            };

            if(args[0].toLowerCase() === "disable"){
                data.guild.channels.confessions.enabled = false;
                data.guild.markModified('channels.confessions');
                await data.guild.save();
                const disabledconfessions = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha desactivado el módulo de confesiones")
                .setColor("GREEN");
            return message.reply({ embeds: [disabledconfessions] })
            };

            if(args[0].toLowerCase() === "enable"){
                if(data.guild.channels.confessions.channel.trim() === "") {
                    const errorNoSet = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No hay un canal de confesiones establecido. Activar así el módulo de confesiones podría causar un error fatal.")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoSet] })
                } else {
                    data.guild.channels.confessions.enabled = true;
                data.guild.markModified('channels.confessions');
                await data.guild.save();
                const enabledconfessions = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha activado el módulo de confesiones")
                .setColor("GREEN");
            return message.reply({ embeds: [enabledconfessions] })
                }
            };

            if(args[0].toLowerCase() === "test"){
                if(!data.guild.channels.confessions.enabled || data.guild.channels.confessions.channel.trim() === ""){
                    const errorNoSet = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No hay un canal de confesiones seleccionado donde hacer la prueba")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoSet] })
                }
                

                let channel = await client.tools.resolveChannel(data.guild.channels.confessions.channel, message.guild);
                let confessionRandomMessageOptions = [
                    "Confieso que un día estaba paseando por la calle y me encontré un euro en el suelo, lo cogí y me compré una coca-cola",
                    "Admito que me gusta mucho ver el canal de cosas calientes",
                    "Confieso que te amo, Carlix <3",
                    "Le rezo todos los días a Chocolat"
                ];
                let confessionRandomMessage = confessionRandomMessageOptions[Math.floor(Math.random() * confessionRandomMessageOptions.length)]
                
                let testEmbed = new MessageEmbed()
                    .setAuthor(`• Confesión de prueba de ${message.author.username}`, message.author.avatarURL())
                    .setDescription(confessionRandomMessage)
                    .setColor("BLUE");
                return channel.send({ embeds: [testEmbed] }).then(async m => {
                    if(data.guild.channels.confessions.reactions === true) {
                        let emojis = ["🤣", "😱", "🤬", "🥵", "😎", "😭", "🤡", "🤯", "🤭", "😳", "👻", "🤨", "🥱"];
                        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                        m.react(randomEmoji)
                    };
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

                
                data.guild.channels.confessions.enabled = true;
                data.guild.channels.confessions.channel = channel.id;
                data.guild.markModified('channels.confessions');
                await data.guild.save();

                const setSGChannel = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`${channel} es el nuevo canal de confesiones`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setSGChannel] })
            };

            if(args[0].toLowerCase() === "reactions"){
                let status = args[1].toLowerCase()
                if(!status) {
                    const errorNoArgs = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No has especificado el estado de activación que quieres")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoArgs] })
                };

                if(status === "true") {
                data.guild.channels.confessions.reactions = true;
                data.guild.markModified('channels.confessions');
                await data.guild.save();

                const setSGChannel = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`Ahora aparecerán reacciones aleatorias en las confesiones`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setSGChannel] })
                } else if(status === "false") {
                    data.guild.channels.confessions.reactions = false;
                    data.guild.markModified('channels.confessions');
                    await data.guild.save();

                    const setSGChannel = new MessageEmbed()
                    .setTitle("✅ • La operación ha sido un éxito")
                    .setDescription(`Ya no aparecerán reacciones aleatorias en las confesiones`)
                    .setColor("GREEN");
                return message.reply({ embeds: [setSGChannel] })
                } else {

                }
            };
            
            let helpMeEmbed = new MessageEmbed()
            .setTitle("❓ • Necesitas ayuda?")
            .setDescription(`El comando \`confessions\` sirve para gestionar todo lo relacionado con las confesiones, ya sea activarlas, desactivarlas, probarlas o personalizarlas\nAquí tienes los esquemas de uso de este comando`)
            .addLabel(`Selecciona el canal de confesiones`, "```{prefix}confessions set #channel```")
            .addLabel(`Activa las confesiones`, "```{prefix}confessions enable```")
            .addLabel(`Desactiva las confesiones`, "```{prefix}confessions disable```")
            .addLabel(`Prueba las confesiones para ver si funcionan correctamente`, "```{prefix}confessions test```")
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