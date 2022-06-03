const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "suggestionreply",
    usage: ["Responde a una sugerencia ```{prefix}suggestionreply <id del mensaje> accept (motivo) - Acepta una sugerencia```"],
    enabled: true,
    aliases: ["sugreply"],
    category: "Moderación",
    memberPermissions: [ "BAN_MEMBERS" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    
    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,


    async execute(client, message, args, data){
		try {
            if(data.guild.channels.suggestions.enabled = false) {
                const embed = new MessageEmbed()
                    .setTitle("❌ • No se puede hacer la sugerencia")
                    .setDescription("El módulo de sugerencias está desactivado")
                    .setColor("RED");
                    message.channel.send({ embeds: [embed] })
            };

            if(data.guild.channels.suggestions.channel.trim() === "") {
                const errorNoSet = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No hay un canal de sugerencias establecido")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoSet] })
            };

            let channel = await client.tools.resolveChannel(data.guild.channels.suggestions.channel, message.guild);

            if(!args[0]) {
                const errorEmbed = new MessageEmbed()
                .setTitle("❌ • Algo ha fallado")
                .setDescription("No has especificado la ID del mensaje de la sugerencia")
                .setColor("RED");
                message.channel.send({ embeds: [errorEmbed] })
              } else {
                const format = /^(?:<@!?)?(\d+)>?$/;
                if(!format.test(args[0])) {
                  const errorEmbed = new MessageEmbed()
                  .setTitle("❌ • Algo ha fallado")
                  .setDescription("El texto especificado como ID del mensaje sugerencia no es una ID válida")
                  .setColor("RED");
                  message.channel.send({ embeds: [errorEmbed] })
                } else {
                  const suggestedEmbed = await channel.messages.fetch(args[0]).catch(error => {
                    const errorEmbed = new MessageEmbed()
                    .setTitle("❌ • Algo ha fallado")
                    .setDescription("No he encontrado mensajes con esa ID")
                    .setColor("RED");
                    message.channel.send({ embeds: [errorEmbed] })
                  })
                  let action = args[1]
                  if(!action) {
                    const errorEmbed = new MessageEmbed()
                    .setTitle("❌ • Algo ha fallado")
                    .setDescription("No has especificado la acción a realizar")
                    .setColor("RED");
                    message.channel.send({ embeds: [errorEmbed] })
                  } else {
                    const data = suggestedEmbed.embeds[0];
                    if(data.title.endsWith("Aceptada")) {
                      const errorEmbed = new MessageEmbed()
                    .setTitle("❌ • Algo ha fallado")
                    .setDescription("Esa sugerencia ya ha sido aceptada")
                    .setColor("RED");
                    message.channel.send({ embeds: [errorEmbed] })
                    } else if (data.title.endsWith("Rechazada")) {
                      const errorEmbed = new MessageEmbed()
                    .setTitle("❌ • Algo ha fallado")
                    .setDescription("Esa sugerencia ya ha sido rechazada")
                    .setColor("RED");
                    message.channel.send({ embeds: [errorEmbed] })
                    } else if (data.title.endsWith("potencial")) {
                      const errorEmbed = new MessageEmbed()
                      .setTitle("❌ • Algo ha fallado")
                      .setDescription("Esa sugerencia ya ha sido marcada como potencial")
                      .setColor("RED");
                      message.channel.send({ embeds: [errorEmbed] })
                    } else {
                      if(action === "accept") {
                        let reason = args.slice(2).join(" ")
                        if(!reason) {
                          message.reply("Se ha respondido a la sugerencia")
                          const replied = new MessageEmbed()
                          .setTitle(`${data.title} • Aceptada`)
                          .setDescription(`${data.description}`)
                          .addField(`Respuesta de ${message.author.username}`, `No ha aportado una razón, pero sugerencia aceptada!`)
                          .setColor("GREEN");
                          suggestedEmbed.edit({ embeds: [replied] })
  
                        } else {
                          message.reply("Se ha respondido a la sugerencia")
                          const replied = new MessageEmbed()
                          .setTitle(`${data.title} • Aceptada`)
                          .setDescription(`${data.description}`)
                          .addField(`Respuesta de ${message.author.username}`, `${reason}`)
                          .setColor("GREEN");
                          suggestedEmbed.edit({ embeds: [replied] })
  
                        }
                      } else if(action === "maybe") {
                        let reason = args.slice(2).join(" ")
                        if(!reason) {
                          message.reply("Se ha respondido a la sugerencia")
                          const replied = new MessageEmbed()
                          .setTitle(`${data.title} • Marcada como potencial`)
                          .setDescription(`${data.description}`)
                          .addField(`Respuesta de ${message.author.username}`, `No ha aportado una razón, pero sugerencia marcada como potencial`)
                          .setColor("YELLOW");
                          suggestedEmbed.edit({ embeds: [replied] })
  
                        } else {
                          message.reply("Se ha respondido a la sugerencia")
                          const replied = new MessageEmbed()
                          .setTitle(`${data.title} • Marcada como potencial`)
                          .setDescription(`${data.description}`)
                          .addField(`Respuesta de ${message.author.username}`, `${reason}`)
                          .setColor("YELLOW");
                          suggestedEmbed.edit({ embeds: [replied] })
  
                        }
                      } else if(action === "reject") {
                        let reason = args.slice(2).join(" ")
                        if(!reason) {
                          message.reply("Se ha respondido a la sugerencia")
                          const replied = new MessageEmbed()
                          .setTitle(`${data.title} • Rechazada`)
                          .setDescription(`${data.description}`)
                          .addField(`Respuesta de ${message.author.username}`, `No ha aportado una razón, pero sugerencia rechazada...`)
                          .setColor("RED");
                          suggestedEmbed.edit({ embeds: [replied] })
  
                        } else {
                          message.reply("Se ha respondido a la sugerencia")
                          const replied = new MessageEmbed()
                          .setTitle(`${data.title} • Rechazada`)
                          .setDescription(`${data.description}`)
                          .addField(`Respuesta de ${message.author.username}`, `${reason}`)
                          .setColor("RED");
                          suggestedEmbed.edit({ embeds: [replied] })
                        }
                      } else {
                        const embed = new MessageEmbed()
            .setTitle("❌ • No se puede responder a la sugerencia")
            .setDescription("La demarcación seleccionada no existe")
            .setColor("RED");
            message.channel.send({ embeds: [embed] })
                      }
                    }
                  }
                }
              }
            
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