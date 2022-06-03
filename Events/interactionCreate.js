const { MessageEmbed } = require("discord.js");
const config = require("../config.json"),
cmdCooldown = {};
const Levels = require("discord-xp");
const { words } = require("lodash");
Levels.setURL(config.mongoDB);

module.exports = async(client, interaction) => {
try {
      if (interaction.isCommand()) {
        const command = client.slash.get(interaction.commandName);
        if (!command) {
           const errorNoCommand = new MessageEmbed()
           .setTitle("❌ • Algo ha fallado ")
           .setDescription(`**${command}** no existe... pero puedes ver la lista de mis comandos con \`/commands\` ^^`)
           .setColor("RED")
           return interaction.reply({ embeds: errorNoCommand });
        }
        
        if (command.ownerOnly) {
            if (interaction.user.id !== config.ownerID) {
              const errorNoCommand = new MessageEmbed()
              .setTitle("❌ • Algo ha fallado ")
              .setDescription(`**${command}** es un comando reservado para desarrolladores`)
              .setColor("RED")
              return interaction.reply({ embeds: [errorNoCommand] })
          }
        }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
  
  
        try {
            command.execute(client, interaction, args)
        } catch (e) {
           const errorKaboom = new MessageEmbed()
           .setTitle("❌ • Algo raro ha pasado")
           .setDescription(`No se ha podido ejecutar este comando. Vuelve a intentarlo; y si esto sigue pasando, avisa a un desarrollador.`)
           .addField("Error log", `\`\`\`${e.message}\`\`\``)
           .setColor("RED")
       return interaction.reply({ embeds: [errorKaboom] })
        }
      };
        if(interaction.isButton()) {
            if(interaction.customId == "acceptTest") {
                const embed = new MessageEmbed()
                .setTitle("💞 • Ahora estamos oficialmente casados")
                .setDescription("Me haces muy feliz ^^")
                .setFooter("Gracias por aceptar")
                .setColor("GREEN")
                return interaction.channel.send({ embeds: [embed] })
            } else if(interaction.customId == "rejectTest") {
                const embed = new MessageEmbed()
                .setTitle("🥀 • Vaya...")
                .setDescription("Disculpa las molestias, tal vez sea demasiado pronto")
                .setFooter("Entiendo que hayas rechazado")
                .setColor("RED")
                return interaction.channel.send({ embeds: [embed] })
            } else if((interaction.customId == "awaitMsgTest")) {
                interaction.channel.send("Por supuesto...").then(i => {
                    const filter = m => m.member.user.id === interaction.member.user.id;
                    const collector = interaction.channel.createMessageCollector({ filter, time: 30000 });

                    collector.on('collect', m => {
                        const wordsEmbed = new MessageEmbed()
                        .setTitle("Entiendo tus palabras")
                        .setDescription(`\`\`\`${m.content}\`\`\``)
                        .setColor("BLUE")
                        interaction.channel.send({ embeds: [wordsEmbed] })
                          });
                          collector.on('end', collected => {
                            console.log(`${collected.size} items coleccionados`);
                            }); 
                    }); 
                }
            }    
    } catch(err) {
        console.error(err);
    }

};