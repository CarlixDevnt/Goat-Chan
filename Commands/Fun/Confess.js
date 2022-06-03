const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "confess",
    usage: ["Haz una confesión ```{prefix}confess (a) <texto> - Confesión anónima\n{prefix}confess n <texto> - Confesión con tu nombre```"],
    enabled: true,
    aliases: [],
    category: "Diversión",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            if(data.guild.channels.confessions.enabled === false) {
                const embed = new MessageEmbed()
                    .setTitle("❌ • No se puede hacer la confesión")
                    .setDescription("El módulo de confesiones está desactivado")
                    .setColor("RED");
                    message.channel.send({ embeds: [embed] })
            } else {
                if(data.guild.channels.confessions.channel.trim() === "") {
                const errorNoSet = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription("No hay un canal de confesiones establecido")
                        .setColor("RED");
                    return message.reply({ embeds: [errorNoSet] })
            } else {

            let channel = await client.tools.resolveChannel(data.guild.channels.confessions.channel, message.guild);

            if(args[0]) {
                if(args[0] === "a") {
                  if(!args[1]) {
                    const embed = new MessageEmbed()
                    .setTitle("❌ • No se puede hacer la confesión")
                    .setDescription("No has confesado nada (tienes que escribir lo que quieres confesar)\n`Esquema de uso: gc!confess (a/n) <confesión>`")
                    .setColor("RED");
                    message.repy({ embeds: [embed] })
                  } else {
                    message.delete()
                const embed = new MessageEmbed()
            .setAuthor("• Nueva confesión anónima", "https://media.discordapp.net/attachments/901875797260918811/933400026057678868/Qmark.png")
            .setDescription(`${args.slice(1).join(" ")}`)
            .setColor("RANDOM");
            channel.send({ embeds: [embed] }).then(m => {
                if(data.guild.channels.confessions.reactions === true) {
                    let emojis = ["🤣", "😱", "🤬", "🥵", "😎", "😭", "🤡", "🤯", "🤭", "😳", "👻", "🤨", "🥱"];
                let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                m.react(randomEmoji)
                }
            })
                  }
                } else if(args[0] === "n") {
                  if(!args[1]) {
                    const embed = new MessageEmbed()
                    .setTitle("❌ • No se puede hacer la confesión")
                    .setDescription("No has confesado nada (tienes que escribir lo que quieres confesar)\n`Esquema de uso: gc!confess (a/n) <confesión>`")
                    .setColor("RED");
                    message.channel.send({ embeds: [embed] })
                  } else {
                    message.delete()
                const embed = new MessageEmbed()
            .setAuthor(`• Nueva confesión de ${message.author.username}`, message.author.avatarURL())
            .setThumbnail()
            .setDescription(`${args.slice(1).join(" ")}`)
            .setColor("RANDOM");
            channel.send({ embeds: [embed] }).then(m => {
                if(data.guild.channels.confessions.reactions === true) {
                    let emojis = ["🤣", "😱", "🤬", "🥵", "😎", "😭", "🤡", "🤯", "🤭", "😳", "👻", "🤨", "🥱"];
                let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                m.react(randomEmoji)
                }
            })
                  }
                } else {
                  message.delete()
                  const embed = new MessageEmbed()
              .setAuthor("• Nueva confesión anónima", "https://media.discordapp.net/attachments/901875797260918811/933400026057678868/Qmark.png")
              .setDescription(`${args.slice(0).join(" ")}`)
              .setColor("RANDOM");
              channel.send({ embeds: [embed] }).then(m => {
                if(data.guild.channels.confessions.reactions === true) {
                    let emojis = ["🤣", "😱", "🤬", "🥵", "😎", "😭", "🤡", "🤯", "🤭", "😳", "👻", "🤨", "🥱"];
                let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                m.react(randomEmoji)
                }
            })
                }
              } else {
                const embed = new MessageEmbed()
          .setTitle("❌ • No se puede hacer la confesión")
          .setDescription("No has confesado nada (tienes que escribir lo que quieres confesar)\n`Esquema de uso: gc!confess (a/n) <confesión>`")
          .setColor("RED");
          message.channel.send({ embeds: [embed] })
                    }
                }
            }
        } catch(err) {
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