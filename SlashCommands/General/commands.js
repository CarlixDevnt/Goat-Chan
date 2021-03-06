const { MessageEmbed } = require("discord.js");
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require("discord-menus");

module.exports = {
    name: "commands",
    description: "Obt茅n mi lista de comandos",
    enabled: true,
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    cooldown: 5000,


    async execute(client, interaction, args, data){
        let utilityToggle = false;
        try {
          const MenusManager = new DiscordMenus(client);
          const nsfwMenu = new MenuBuilder()
          .addLabel(`Administraci贸n`, {
            description: `Comandos para la gesti贸n del servidor en s铆`,
            value: "admin",
            emoji: {
              name: "馃憫",
            },
          })
          .addLabel(`Diversi贸n`, {
            description: `Comandos con el prop贸sito de entretener`,
            value: "fun",
            emoji: {
              name: "馃帾",
            },
          })
          .addLabel(`Estad铆sticas`, {
            description: `Comandos con estad铆sticas`,
            value: "stats",
            emoji: {
              name: "馃搳",
            },
          })
          .addLabel(`General`, {
            description: `Los comandos generales del bot`,
            value: "general",
            emoji: {
              name: "馃悙",
            },
          })
          .addLabel(`Im谩genes`, {
            description: `Comandos de generaci贸n de im谩genes`,
            value: "images",
            emoji: {
              name: "馃寙",
            },
          })
          .addLabel(`Interacci贸n`, {
            description: `Comandos de acciones y reacciones, destinados principalmente al roleplay`,
            value: "interaction",
            emoji: {
              name: "馃",
            },
          })
          .addLabel(`Minijuegos`, {
            description: `Para jugar a diversos minijuegos`,
            value: "games",
            emoji: {
              name: "馃幃",
            },
          })
          .addLabel(`Moderaci贸n`, {
            description: `Comandos para la gesti贸n de miembros del servidor`,
            value: "moderation",
            emoji: {
              name: "馃獩",
            },
          })
          .addLabel(`NSFW`, {
            description: `Comandos para mayores de edad`,
            value: "nsfw",
            emoji: {
              name: "馃敒",
            },
          })
          .addLabel(`Niveles`, {
            description: `Comandos sobre tu nivel en el bot`,
            value: "leveling",
            emoji: {
              name: "馃弳",
            },
          })
          .addLabel(`Perfil`, {
            description: `Comandos de configuraci贸n de perfiles dentro del bot`,
            value: "profile",
            emoji: {
              name: "馃挸",
            },
          })
          .addLabel(`Utilidad`, {
            description: `Comandos con diferentes herramientas 煤tiles`,
            value: "utility",
            emoji: {
              name: "馃О",
            },
          })
            .setMaxValues(1)
            .setCustomID("menucommands")
            .setPlaceHolder(`Categor铆as de comandos 鈥? Selecciona una opci贸n`);
  
            const sfwMenu = new MenuBuilder()
            .addLabel(`Administraci贸n`, {
              description: `Comandos para la gesti贸n del servidor en s铆`,
              value: "admin",
              emoji: {
                name: "馃憫",
              },
            })
            .addLabel(`Diversi贸n`, {
              description: `Comandos con el prop贸sito de entretener`,
              value: "fun",
              emoji: {
                name: "馃帾",
              },
            })
            .addLabel(`Estad铆sticas`, {
              description: `Comandos con estad铆sticas`,
              value: "stats",
              emoji: {
                name: "馃搳",
              },
            })
            .addLabel(`General`, {
              description: `Los comandos generales del bot`,
              value: "general",
              emoji: {
                name: "馃悙",
              },
            })
            .addLabel(`Im谩genes`, {
              description: `Comandos de generaci贸n de im谩genes`,
              value: "images",
              emoji: {
                name: "馃寙",
              },
            })
            .addLabel(`Interacci贸n`, {
              description: `Comandos de acciones y reacciones, destinados principalmente al roleplay`,
              value: "interaction",
              emoji: {
                name: "馃",
              },
            })
            .addLabel(`Minijuegos`, {
              description: `Para jugar a diversos minijuegos`,
              value: "games",
              emoji: {
                name: "馃幃",
              },
            })
            .addLabel(`Moderaci贸n`, {
              description: `Comandos para la gesti贸n de miembros del servidor`,
              value: "moderation",
              emoji: {
                name: "馃獩",
              },
            })
            .addLabel(`Niveles`, {
              description: `Comandos sobre tu nivel en el bot`,
              value: "leveling",
              emoji: {
                name: "馃弳",
              },
            })
            .addLabel(`Perfiles`, {
              description: `Comandos de configuraci贸n de perfiles dentro del bot`,
              value: "profile",
              emoji: {
                name: "馃挸",
              },
            })
            .addLabel(`Utilidad`, {
              description: `Comandos con diferentes herramientas 煤tiles`,
              value: "utility",
              emoji: {
                name: "馃О",
              },
            })
              .setMaxValues(1)
              .setCustomID("menucommands")
              .setPlaceHolder(`Categor铆as de comandos 鈥? Selecciona una opci贸n`);

            let mainEmbedNSFW = new MessageEmbed()
              .setAuthor("鈥? Lista de comandos", "https://media.discordapp.net/attachments/901875797260918809/962783465936420905/8618-blonde-neko-wave.gif")
              .setDescription('Aqu铆 tienes la lista de comandos de Goat-Chan... 隆Usa el men煤 de abajo para navegar por las categor铆as de comandos!')
              .setFooter("Este men煤 dejar谩 de funcionar en 10 minutos")
              .addField("Categor铆as disponibles", "```馃敡 路 Ajustes\n馃幉 路 Diversi贸n\n馃搳 路 Estad铆sticas\n馃悙 路 General\n馃寙 路 Im谩genes\n馃 路 Interacci贸n\n馃幃 路 Minijuegos\n馃獩 路 Moderaci贸n (DESHABILITADOS)\n馃弳 路 Niveles\n馃敒 路 NSFW\n馃挸 路 Perfiles\n馃О 路 Utilidad```")
              .setColor("#3dffec")
            let mainEmbedSFW = new MessageEmbed()
              .setAuthor("鈥? Lista de comandos", "https://media.discordapp.net/attachments/901875797260918809/962783465936420905/8618-blonde-neko-wave.gif")
              .setDescription('Aqu铆 tienes la lista de comandos de Goat-Chan... 隆Usa el men煤 de abajo para navegar por las categor铆as de comandos!')
              .setFooter("Este men煤 dejar谩 de funcionar en 10 minutos")
              .addField("Categor铆as disponibles", "```馃敡 路 Ajustes\n馃幉 路 Diversi贸n\n馃搳 路 Estad铆sticas\n馃悙 路 General\n馃寙 路 Im谩genes\n馃 路 Interacci贸n\n馃幃 路 Minijuegos\n馃獩 路 Moderaci贸n (DESHABILITADOS)\n馃弳 路 Niveles\n馃挸 路 Perfiles\n馃О 路 Utilidad\n\nNOTA: Para ver los comandos nsfw, usa este comando en un canal marcado como nsfw```")
              .setColor("#3dffec")

              if(interaction.channel.nsfw) {
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
                        .setDescription("**馃敡 鈥? Administraci贸n**\nModifica la configuraci贸n del bot en el servidor")
                        .addField(`Configuraci贸n general`, "```channel - dashboard```")
                        .addField(`Configuraciones espec铆ficas`, "```antilink - autorole - confchannel - leavechannel - leavemessage\nprefix - welcomechannel - welcomemessage```")
                        .setColor("RANDOM");
                        await menu.reply(settingsEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "fun") {
                      const funEmbed = new MessageEmbed()
                        .setDescription("**馃幉 鈥? Diversi贸n**\nNo dejes que el aburrimiento pueda contigo")
                        .addField(`P煤blicos`, "```8ball - confession - dicksize - howgay - love\nluckcheck - rate```")
                        .addField(`Exclusivos para partners`, "```Ninguno todav铆a```")
                        .setColor("RANDOM");
                        await menu.reply(funEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "stats") {
                      const statsEmbed = new MessageEmbed()
                        .setDescription("**馃搳 鈥? Estad铆sticas**\nComandos de estad铆sticas sobre muchas cosas. AVISO: No funcionar谩n hasta la 1.5 parte 2")
                        .addField(`Sobre el bot`, "```botstats - mystats - topcommands - topscores```")
                        .addField(`Otras estad铆sticas`, "```instagram - spotify - twitch - twitter - youtubestats```")
                        .setColor("RANDOM");
                        await menu.reply(statsEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "general") {
                      const generalEmbed = new MessageEmbed()
                        .setDescription("**馃悙 鈥? General**\nComandos b谩sicos sobre m铆 y sobre mis usos")
                        .addField("Todos los comandos", "```commands - help -  ping```")
                        .setColor("RANDOM");
                        await menu.reply(generalEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "images") {
                      const imageEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription("**馃寙 鈥? Im谩genes**\nAdmira la belleza audiovisual est谩tica")
                        .addField(`P煤blicos`, "```avatar - bunny - cat - dog - duck\nfox - koala - lizard - panda - servericon\nshiba```")
                        .addField(`Exclusivos para partners`, "```changemymind - rip - trigger - trumptweet - wasted\nwideavatar```");
                        await menu.reply(imageEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "interaction") {
                      const interactionEmbed = new MessageEmbed()
                        .setDescription("**馃 鈥? Interacci贸n**\nDiversos comandos de acciones para roleplay")
                        .addField(`Interacci贸n`, "```camp - cook - cuddle - cure - draw\ndrive - eat - feed - hug - kill\nkiss - pat - peek - play - punch\nrun - sip - slap - sleep - stare\ntickle - travel - work```")
                        .addField(`Reacci贸n`, "```angry - blush - bored - cry - dance\nlaugh - like - nervous - think - wink```")
                        .setColor("RANDOM");
                        await menu.reply(interactionEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "leveling") {
                      const levelEmbed = new MessageEmbed()
                        .setDescription("**馃弳 鈥? Niveles**\nObserva el sistema de niveles dentro de Goat-Chan")
                        .addField(`Todos los comandos`, "```level - ranking```")
                        .setColor("RANDOM");
                        await menu.reply(levelEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "games") {
                      const gameEmbed = new MessageEmbed()
                        .setDescription("**馃幃 鈥? Minijuegos**\nJuega a varios minijuegos (en desarrollo)")
                        .addField(`P煤blicos`, "```connect4 - snake```")
                        .addField(`VIP`, "```rps - ttt```")
                        .setColor("RANDOM");
                        await menu.reply(gameEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "moderation") {
                      const modEmbed = new MessageEmbed()
                        .setDescription("**馃獩 鈥? Moderaci贸n**\nModera tu servidor y hazlo m谩s seguro")
                        .addField("Aviso a navegantes", "```Los comandos de moderaci贸n han sido temporalmente deshabilitados debido a problemas de compatibilidad de permisos```")
                        .setColor("RANDOM");
                        await menu.reply(modEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "nsfw") {
                      const nsfwEmbed = new MessageEmbed()
                        .setDescription("**馃敒 鈥? NSFW**\nNo aptos para menores de edad")
                        .addField(`P煤blicos`, "```ahegao - anal - boobjob - fap - footjob\nfuck - hentai - lewdneko - suck```")
                        .addField(`Exclusivos para partners`, "```Ninguno todav铆a```")
                        .setColor("RANDOM");
                        await menu.reply(nsfwEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "profile") {
                      const profileEmbed = new MessageEmbed()
                        .setDescription("**馃挸 鈥? Perfiles**\nGestiona tu perfil dentro del bot")
                        .addField(`Todos los comandos`, "```bio - birthday - color - favouritepokemon - name```")
                        .setColor("RANDOM");
                        await menu.reply(profileEmbed, {
                          ephemeral: true,
                        });
                    } else if (menu.values[0].toLowerCase() == "utility") {
                      const utilityEmbed = new MessageEmbed()
                        .setDescription("**馃О 鈥? Utilidad**\nUna peque帽a caja de herramientas 煤tiles")
                        .addField(`P煤blicos`, "```animesearch - calc - serverinfo - suggest - userinfo```")
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
            console.log(err)
            const errorKaboom = new MessageEmbed()
                .setTitle("鉂? 鈥? Algo raro ha pasado")
                .setDescription(`No se ha podido ejecutar este comando. Vuelve a intentarlo; y si esto sigue pasando, avisa a un desarrollador.`)
                .addField("Error log", `\`\`\`${err}\`\`\``)
                .setColor("RED")
            return interaction.reply({ embeds: [errorKaboom] })
        }
    }
}