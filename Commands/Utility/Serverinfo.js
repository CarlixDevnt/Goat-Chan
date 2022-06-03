const moment = require('moment');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "serverinfo",
    usage: ["Obtén información sobre el servidor ```{prefix}serverinfo```"],
    enabled: true,
    aliases: [],
    category: "Utilidad",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            const mention = message.member;
            const afk =
              message.guild.afkChannel === null ? "`No hay`" : message.guild.afkChannel;
            let servericon = message.guild.iconURL;
            let verifLevels = {
              NONE: "Ninguno",
              LOW: "Bajo",
              MEDIUM: "Medio",
              HIGH: "(╯°□°）╯︵  ┻━┻ (Alto)",
              VERY_HIGH: "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (Muy alto)",
            };
            let region = {
              brazil: "Brasil",
              "eu-central": "Europa Central",
              singapore: "Singapur",
              "us-central": "EEUU (Centro)",
              sydney: "Sydney",
              "us-east": "EEUU (Este)",
              "us-south": "EEUU (Sur)",
              "us-west": "EEUU (Oeste)",
              "eu-west": "oeste de Europa",
              "vip-us-east": "EEUU (Este, VIP)",
              london: "Londres",
              amsterdam: "Ámsterdam",
              hongkong: "Hong Kong",
              russia: "Rusia",
              southafrica: "Sudáfrica",
              india: "India",
            };
            const serverembed = new MessageEmbed()
              .setAuthor(`${message.guild.name}`, message.guild.iconURL())
              .setThumbnail(servericon)
              .addField(
                `Información general`,
                `Propietario: ${message.guild.owner} \nRegión: \`${
                  region[message.guild.region]
                }\` \nNivel de verificación: \`${
                  verifLevels[message.guild.verificationLevel]
                }\``
              )
              .addField(
                `Vista general`,
                `Canales: \`${
                  message.guild.channels.cache.size
                }\` \nDe texto: \`${
                  message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size
                }\` \nDe voz: \`${
                  message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size
                }\` \nCanal AFK: ${afk} \nTimeout para AFK: \`${
                  message.guild.afkTimeout
                } s\` \nRoles totales: \`${
                  message.guild.roles.cache.size
                }\` \nEmojis totales: \`${message.guild.emojis.cache.size}\``
              )
              .addField(
                `información sobre miembros`,
                `Total de miembros: \`${message.guild.memberCount}\` \nHumanos (en teoría): \`${
                  message.guild.members.cache.filter((member) => !member.user.bot).size
                }\` \nBots: \`${
                  message.guild.members.cache.filter((member) => member.user.bot).size
                }\``
              )
              .addField(
                `Información inútil`,
                `Fecha en la que te uniste: \n\`${moment(mention.joinedAt).format(
                  "dddd, MMMM Do YYYY, h:mm:ss A"
                )}\` \nFecha de creación del servidor: \n\`${moment(message.guild.createdAt).format(
                  "dddd, MMMM Do YYYY, h:mm:ss A"
                )}\``
              )
              .setThumbnail(message.guild.iconURL())
              .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL())
              .setColor("RANDOM")
              .setTimestamp();
        
            message.reply({ embeds: [serverembed] });

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