const { MessageEmbed } = require("discord.js");
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require("discord-menus");
module.exports = {
    name: "commands",
    usage: ["Obtén mi lista de comandos ```{prefix}help <command>```"],
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
      let utilityToggle = false;
        try {
          const MenusManager = new DiscordMenus(client);
          const nsfwMenu = new MenuBuilder()
          .addLabel(`Administración`, {
            description: `Comandos para la gestión del servidor en sí`,
            value: "admin",
            emoji: {
              name: "👑",
            },
          })
          .addLabel(`Diversión`, {
            description: `Comandos con el propósito de entretener`,
            value: "fun",
            emoji: {
              name: "🎪",
            },
          })
          .addLabel(`Estadísticas`, {
            description: `Comandos con estadísticas`,
            value: "stats",
            emoji: {
              name: "📊",
            },
          })
          .addLabel(`General`, {
            description: `Los comandos generales del bot`,
            value: "general",
            emoji: {
              name: "🐐",
            },
          })
          .addLabel(`Imágenes`, {
            description: `Comandos de generación de imágenes`,
            value: "images",
            emoji: {
              name: "🌆",
            },
          })
          .addLabel(`Interacción`, {
            description: `Comandos de acciones y reacciones, destinados principalmente al roleplay`,
            value: "interaction",
            emoji: {
              name: "🤝",
            },
          })
          .addLabel(`Minijuegos`, {
            description: `Para jugar a diversos minijuegos`,
            value: "games",
            emoji: {
              name: "🎮",
            },
          })
          .addLabel(`Moderación`, {
            description: `Comandos para la gestión de miembros del servidor`,
            value: "moderation",
            emoji: {
              name: "🪛",
            },
          })
          .addLabel(`NSFW`, {
            description: `Comandos para mayores de edad`,
            value: "nsfw",
            emoji: {
              name: "🔞",
            },
          })
          .addLabel(`Niveles`, {
            description: `Comandos sobre tu nivel en el bot`,
            value: "leveling",
            emoji: {
              name: "🏆",
            },
          })
          .addLabel(`Perfil`, {
            description: `Comandos de configuración de perfiles dentro del bot`,
            value: "profile",
            emoji: {
              name: "💳",
            },
          })
          .addLabel(`Utilidad`, {
            description: `Comandos con diferentes herramientas útiles`,
            value: "utility",
            emoji: {
              name: "🧰",
            },
          })
            .setMaxValues(1)
            .setCustomID("menucommands")
            .setPlaceHolder(`Categorías de comandos • Selecciona una opción`);
  
            const sfwMenu = new MenuBuilder()
            .addLabel(`Administración`, {
              description: `Comandos para la gestión del servidor en sí`,
              value: "admin",
              emoji: {
                name: "👑",
              },
            })
            .addLabel(`Diversión`, {
              description: `Comandos con el propósito de entretener`,
              value: "fun",
              emoji: {
                name: "🎪",
              },
            })
            .addLabel(`Estadísticas`, {
              description: `Comandos con estadísticas`,
              value: "stats",
              emoji: {
                name: "📊",
              },
            })
            .addLabel(`General`, {
              description: `Los comandos generales del bot`,
              value: "general",
              emoji: {
                name: "🐐",
              },
            })
            .addLabel(`Imágenes`, {
              description: `Comandos de generación de imágenes`,
              value: "images",
              emoji: {
                name: "🌆",
              },
            })
            .addLabel(`Interacción`, {
              description: `Comandos de acciones y reacciones, destinados principalmente al roleplay`,
              value: "interaction",
              emoji: {
                name: "🤝",
              },
            })
            .addLabel(`Minijuegos`, {
              description: `Para jugar a diversos minijuegos`,
              value: "games",
              emoji: {
                name: "🎮",
              },
            })
            .addLabel(`Moderación`, {
              description: `Comandos para la gestión de miembros del servidor`,
              value: "moderation",
              emoji: {
                name: "🪛",
              },
            })
            .addLabel(`Niveles`, {
              description: `Comandos sobre tu nivel en el bot`,
              value: "leveling",
              emoji: {
                name: "🏆",
              },
            })
            .addLabel(`Perfiles`, {
              description: `Comandos de configuración de perfiles dentro del bot`,
              value: "profile",
              emoji: {
                name: "💳",
              },
            })
            .addLabel(`Utilidad`, {
              description: `Comandos con diferentes herramientas útiles`,
              value: "utility",
              emoji: {
                name: "🧰",
              },
            })
              .setMaxValues(1)
              .setCustomID("menucommands")
              .setPlaceHolder(`Categorías de comandos • Selecciona una opción`);

            let mainEmbedNSFW = new MessageEmbed()
              .setAuthor("• Lista de comandos", "https://media.discordapp.net/attachments/901875797260918809/962783465936420905/8618-blonde-neko-wave.gif")
              .setDescription('Aquí tienes la lista de comandos de Goat-Chan... ¡Usa el menú de abajo para navegar por las categorías de comandos!')
              .setFooter("Este menú dejará de funcionar en 10 minutos")
              .addField("Categorías disponibles", "```🔧 · Ajustes\n🎲 · Diversión\n📊 · Estadísticas\n🐐 · General\n🌆 · Imágenes\n🤝 · Interacción\n🎮 · Minijuegos\n🪛 · Moderación (DESHABILITADOS)\n🏆 · Niveles\n🔞 · NSFW\n💳 · Perfiles\n🧰 · Utilidad```")
              .setColor("#3dffec")
            let mainEmbedSFW = new MessageEmbed()
              .setAuthor("• Lista de comandos", "https://media.discordapp.net/attachments/901875797260918809/962783465936420905/8618-blonde-neko-wave.gif")
              .setDescription('Aquí tienes la lista de comandos de Goat-Chan... ¡Usa el menú de abajo para navegar por las categorías de comandos!')
              .setFooter("Este menú dejará de funcionar en 10 minutos")
              .addField("Categorías disponibles", "```🔧 · Ajustes\n🎲 · Diversión\n📊 · Estadísticas\n🐐 · General\n🌆 · Imágenes\n🤝 · Interacción\n🎮 · Minijuegos\n🪛 · Moderación (DESHABILITADOS)\n🏆 · Niveles\n💳 · Perfiles\n🧰 · Utilidad\n\nNOTA: Para ver los comandos nsfw, usa este comando en un canal marcado como nsfw```")
              .setColor("#3dffec")

              if(message.channel.nsfw) {
                await MenusManager.sendMenu(message, mainEmbedNSFW, {
                  menu: nsfwMenu,
                });
              } else {
                await MenusManager.sendMenu(message, mainEmbedSFW, {
                  menu: sfwMenu,
                });
              }
              if (utilityToggle == false) {
                MenusManager.on("MENU_CLICKED", async (menu) => {
                    if (menu.values[0].toLowerCase() == "admin") {
                      const settingsEmbed = new MessageEmbed()
                        .setDescription("**🔧 • Administración**\nModifica la configuración del bot en el servidor")
                        .addField(`Configuración general`, "```channel - dashboard```")
                        .addField(`Configuraciones específicas`, "```antilink - autorole - confchannel - leavechannel - leavemessage\nprefix - welcomechannel - welcomemessage```")
                        .setColor("RANDOM");
                        await menu.reply(settingsEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "fun") {
                      const funEmbed = new MessageEmbed()
                        .setDescription("**🎲 • Diversión**\nNo dejes que el aburrimiento pueda contigo")
                        .addField(`Públicos`, "```8ball - confession - dicksize - howgay - love\nluckcheck - rate```")
                        .addField(`Exclusivos para partners`, "```Ninguno todavía```")
                        .setColor("RANDOM");
                        await menu.reply(funEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "stats") {
                      const statsEmbed = new MessageEmbed()
                        .setDescription("**📊 • Estadísticas**\nComandos de estadísticas sobre muchas cosas. AVISO: No funcionarán hasta la 1.5 parte 2")
                        .addField(`Sobre el bot`, "```botstats - mystats - topcommands - topscores```")
                        .addField(`Otras estadísticas`, "```instagram - spotify - twitch - twitter - youtubestats```")
                        .setColor("RANDOM");
                        await menu.reply(statsEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "general") {
                      const generalEmbed = new MessageEmbed()
                        .setDescription("**🐐 • General**\nComandos básicos sobre mí y sobre mis usos")
                        .addField("Todos los comandos", "```commands - help -  ping```")
                        .setColor("RANDOM");
                        await menu.reply(generalEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "images") {
                      const imageEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription("**🌆 • Imágenes**\nAdmira la belleza audiovisual estática")
                        .addField(`Públicos`, "```avatar - bunny - cat - dog - duck\nfox - koala - lizard - panda - servericon\nshiba```")
                        .addField(`Exclusivos para partners`, "```changemymind - rip - trigger - trumptweet - wasted\nwideavatar```");
                        await menu.reply(imageEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "interaction") {
                      const interactionEmbed = new MessageEmbed()
                        .setDescription("**🤝 • Interacción**\nDiversos comandos de acciones para roleplay")
                        .addField(`Interacción`, "```camp - cook - cuddle - cure - draw\ndrive - eat - feed - hug - kill\nkiss - pat - peek - play - punch\nrun - sip - slap - sleep - stare\ntickle - travel - work```")
                        .addField(`Reacción`, "```angry - blush - bored - cry - dance\nlaugh - like - nervous - think - wink```")
                        .setColor("RANDOM");
                        await menu.reply(interactionEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "leveling") {
                      const levelEmbed = new MessageEmbed()
                        .setDescription("**🏆 • Niveles**\nObserva el sistema de niveles dentro de Goat-Chan")
                        .addField(`Todos los comandos`, "```level - ranking```")
                        .setColor("RANDOM");
                        await menu.reply(levelEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "games") {
                      const gameEmbed = new MessageEmbed()
                        .setDescription("**🎮 • Minijuegos**\nJuega a varios minijuegos (en desarrollo)")
                        .addField(`Públicos`, "```connect4 - snake```")
                        .addField(`VIP`, "```rps - ttt```")
                        .setColor("RANDOM");
                        await menu.reply(gameEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "moderation") {
                      const modEmbed = new MessageEmbed()
                        .setDescription("**🪛 • Moderación**\nModera tu servidor y hazlo más seguro")
                        .addField("Aviso a navegantes", "```Los comandos de moderación han sido temporalmente deshabilitados debido a problemas de compatibilidad de permisos```")
                        .setColor("RANDOM");
                        await menu.reply(modEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "nsfw") {
                      const nsfwEmbed = new MessageEmbed()
                        .setDescription("**🔞 • NSFW**\nNo aptos para menores de edad")
                        .addField(`Públicos`, "```ahegao - anal - boobjob - fap - footjob\nfuck - hentai - lewdneko - suck```")
                        .addField(`Exclusivos para partners`, "```Ninguno todavía```")
                        .setColor("RANDOM");
                        await menu.reply(nsfwEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "profile") {
                      const profileEmbed = new MessageEmbed()
                        .setDescription("**💳 • Perfiles**\nGestiona tu perfil dentro del bot")
                        .addField(`Todos los comandos`, "```bio - birthday - color - favouritepokemon - name```")
                        .setColor("RANDOM");
                        await menu.reply(profileEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "utility") {
                      const utilityEmbed = new MessageEmbed()
                        .setDescription("**🧰 • Utilidad**\nUna pequeña caja de herramientas útiles")
                        .addField(`Públicos`, "```animesearch - calc - serverinfo - suggest - userinfo```")
                        .addField(`Exclusivos para partners`, "```tinyurl - weather```")
                        .setColor("RANDOM");
                        await menu.reply(utilityEmbed, {
                          ephemeral: true,
                        });
                    }
                    encendido = true;
                  })
                };
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