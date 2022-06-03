const moment = require('moment');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "userinfo",
    usage: ["Obtén información sobre tu perfil ```{prefix}userinfo (@usuario)```"],
    enabled: true,
    aliases: [],
    category: "Utilidad",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const permissions = {
                "": "No tiene",
                "ADMINISTRATOR": "Administrator",
                "MANAGE_GUILD": "Manage Server",
                "MANAGE_ROLES": "Manage Roles",
                "MANAGE_CHANNELS": "Manage Channels",
                "KICK_MEMBERS": "Kick Members",
                "BAN_MEMBERS": "Ban Members",
                "MANAGE_NICKNAMES": "Manage Nicknames",
                "MANAGE_EMOJIS": "Manage Emojis",
                "MANAGE_WEBHOOKS": "Manage Webhooks",
                "MANAGE_MESSAGES": "Manage Messages",
                "MENTION_EVERYONE": "Mention Everyone"
            }
            const mention = message.mentions.members.first() || message.member;
            const nick = mention.nickname === null ? "No tiene" : mention.nickname;
            const roles = mention.roles.cache.get === "" ? "No tiene" : mention.roles.cache.get;
            const mentionPermissions = mention.permissions.toArray() === null ? "No tiene" : mention.permissions.toArray();
            const finalPermissions = [];
            for (const permission in permissions) {
                if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
                else;
            }
            var flags = {
                "": "No tiene",
                "DISCORD_EMPLOYEE": "<:employee:926162750038736936>",
                "PARTNERED_SERVER_OWNER": "<:partner:926162747425706014>",
                "BUGHUNTER_LEVEL_1": "<:bughunter1:926162748197457981>",
                "BUGHUNTER_LEVEL_2": "<:bughunter2:926162749086633994>",
                "HYPESQUAD_EVENTS": "<:HSEvents:926162746834296912>",
                "HOUSE_BRAVERY": "<:HSBravery:926162749589975130>",
                "HOUSE_BRILLIANCE": "<:HSBrilliance:926162746783965234>",
                "HOUSE_BALANCE": "<:HSBalance:926162747836756078>",
                "EARLY_SUPPORTER": "<:EarlySupporterBadge:926162746230321262>",
                "TEAM_USER": "<:employee:926162750038736936>",
                "SYSTEM": "<:verified:926165620914004039>",
                "VERIFIED_BOT": "<:vbot1:926165624307200040><:vbot2:926165623740973086>",
                "EARLY_VERIFIED_BOT_DEVELOPER": "<:botdev:926165621425700874>",
                "DISCORD_CERTIFIED_MODERATOR": "<:CertifiedModBadge:926162745584402452>"
            };
            var bot = {
                "true": "Es un bot",
                "false": "No es un bot"
            };
            const userlol = new MessageEmbed()
            .setAuthor(`Información de usuario`, mention.user.avatarURL())
            .addField(`General`, `Nombre: \`${mention.user.username}\` \nTag: \`${mention.user.discriminator}\` \nApodo: \`${nick}\``)
            .addField(`Vista general`, `Insignias: ${flags[mention.user.flags.toArray().join(" - ")]}\nEs un bot? \`${bot[mention.user.bot]}\``)
            .addField(`Relacionado con el servidor`, `Roles: <@&${mention.roles.cache.map(r => r.id).join('> - <@&')}> \nPermisos: \`${finalPermissions.join(', ')}\``)
            .addField(`Otros datos`, `Fecha de creación de cuenta: \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nFecha de entrada al servidor: \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
            .setThumbnail(mention.user.avatarURL())
            .setImage(mention.user.banner || mention.user.accentColor)
            .setFooter(`ID: ${mention.user.id}`)
            .setTimestamp()
            .setColor(mention.user.hexAccentColor);
            message.reply({ embeds: [userlol] })

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