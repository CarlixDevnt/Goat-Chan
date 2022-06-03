const { MessageEmbed } = require("discord.js");
const config = require("../config.json"),
cmdCooldown = {};
const Levels = require("discord-xp");
Levels.setURL(config.mongoDB);

module.exports = async(client, message) => {
try {
    if(message.author.bot) return;
    if(!message.guild) return;

    let mentionedUser = message.mentions.users.first()
    if(!mentionedUser) {
        let guildData;
    if(!message.guild.prefix){
        guildData = await client.Database.fetchGuild(message.guild.id);
        message.guild.prefix = guildData.prefix.toLowerCase();
    }
    let prefix = message.guild.prefix;

    
    if(message.content ===`<@!${message.client.user.id}>` || message.content ===`<@${message.client.user.id}>`){
        return message.reply({ content: `¿Te has olvidado de mi prefix? Te recuerdo que es \`${prefix}\` ^^`, allowedMentions: { repliedUser: true }});
    }

    if(!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


    if(!cmd) {
        const errorNoCommand = new MessageEmbed()
        .setTitle("❌ • Algo ha fallado ")
        .setDescription(`**${commandName}** no existe... pero puedes ver la lista de mis comandos con \`${prefix}commands\` ^^`)
        .setColor("RED")
        return message.reply({ embeds: [errorNoCommand] })
    };


    if(!message.channel.nsfw && cmd.nsfw){
        const errorNoHorny = new MessageEmbed()
            .setTitle("🔞 • Esas cosas se hacen en otro lado... 7w7")
            .setDescription(`No puedes usar este comando fuera de canales nsfw`)
            .setColor("RED")
            .setFooter("Eres un pervertido, lo sabías?")
        return message.reply({ embeds: [errorNoHorny] })
    }


    if(cmd.ownerOnly && message.author.id !== config.ownerId){
        const errorNoCommand = new MessageEmbed()
        .setTitle("❌ • Algo ha fallado ")
        .setDescription(`**${cmd.name}** es un comando reservado para desarrolladores`)
        .setColor("RED")
        return message.reply({ embeds: [errorNoCommand] })
    }

    let userPerms = [];
    cmd.memberPermissions.forEach((perm) => {
        if(!message.channel.permissionsFor(message.member).has(perm)){
            userPerms.push(perm);
        }
    });

    if(userPerms.length > 0 && !message.member.roles.cache.find((r) => r.name.toLowerCase() === config.adminRole.toLowerCase())){
            const errorUserPerms = new MessageEmbed()
            .setTitle("❌ • Error de permisos")
            .setDescription(`Te faltan permisos para poder usar este comando`)
            .addField("Permisos que te faltan", `\`\`\`${userPerms.map((p) => `\`${p}\``).join(", ")}\`\`\``)
            .setColor("RED")
            return message.reply({ embeds: [errorUserPerms] })
    }

    let clientPerms = [];
    cmd.botPermissions.forEach((perm) => {
    if(!message.channel.permissionsFor(message.guild.me).has(perm)){
        clientPerms.push(perm);
        }
    });

    if(clientPerms.length > 0){
        
        client.logger.cmd(`${message.author.tag} used ${cmd.name} - Missing permissions`);
        const errorBotPerms = new MessageEmbed()
    .setTitle("❌ • Error de permisos")
    .setDescription(`No tengo permisos permisos para ejecutar este comando`)
    .addField("Permisos que me faltan", `\`\`\`${clientPerms.map((p) => `\`${p}\``).join(", ")}\`\`\``)
    .setColor("RED")
    return message.reply({ embeds: [errorBotPerms] })
    }


    let userCooldown = cmdCooldown[message.author.id];

    if(!userCooldown){
        cmdCooldown[message.author.id] = {};
        uCooldown = cmdCooldown[message.author.id];
    }

    let time = uCooldown[cmd.name] || 0;

    if(time && (time > Date.now())){
        let timeLeft = Math.ceil((time-Date.now())/1000);
        const errorCooldown = new MessageEmbed()
            .setTitle("⏱ • Relájate un poco")
            .setDescription(`Espera ${timeLeft} segundos para poder volver a usar este comando`)
            .setColor("RED")
        return message.reply({ embeds: [errorCooldown] })
    }

    cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown;


    let userData = await client.Database.fetchUser(message.author.id);
    if(!guildData) guildData = await client.Database.fetchGuild(message.guild.id);
    let data = {};
    data.user = userData;
    data.guild = guildData;
    data.cmd = cmd;
    data.config = config;

    if(data.user.filters.nsfw == true && cmd.nsfw) {
        const nopeEmbed = new MessageEmbed()
            .setTitle("🔒 • No puedes usar este comando")
            .setDescription("Tienes el filtro NSFW activado. Desactívalo para poder usar este comando.")
            .setColor("RED");
        return message.reply({ embeds: [nopeEmbed] })
    };


    if(!data.user.ranks.partner === true && cmd.partnerOnly === true) {
        const errorNoPartner = new MessageEmbed()
            .setTitle("❌ • No puedes hacer eso")
            .setDescription(`Necesitas ser Partner de Goat-Chan o estar en un servidor partner para usar este comando`)
            .setFooter("Más información próximamente")
            .setColor("RED");
        return message.reply({ embeds: [errorNoPartner] })
    };

    if(cmd.partnerOnly === true && !data.guild.partner === true && !data.user.ranks.partner === true) {
        const errorNoPartner = new MessageEmbed()
            .setTitle("❌ • No puedes hacer eso")
            .setDescription(`Necesitas ser Partner de Goat-Chan o estar en un servidor partner para usar este comando`)
            .setFooter("Más información próximamente")
            .setColor("RED");
        return message.reply({ embeds: [errorNoPartner] })
    };

    if(data.user.banned === true) {
        const errorBanned = new MessageEmbed()
            .setTitle("🪓 • No puedes usar mis comandos")
            .setDescription(`Has sido baneado del uso del bot`)
            .setColor("RED");
        return message.reply({ embeds: [errorBanned] })
    };




    cmd.execute(client, message, args, data);
    client.logger.cmd(`${message.author.tag} used ${cmd.name}`);


    if(data.guild.plugins.leveling.enabled === true) {
        let random = Math.floor(Math.random() * 45 ) + 30;
        const levelUp = await Levels.appendXp(
            message.author.id,
            message.guild.id,
            random
        );
        if(levelUp) {
            const userXP = await Levels.fetch(message.author.id, message.guild.id);

            if(data.guild.plugins.leveling.sendMessage === true) {
                if(data.guild.plugins.leveling.levelNsgChannel !== null) {
                    let canalDeSubida = await client.tools.resolveChannel(data.guild.plugins.leveling.levelNsgChannel, message.guild);
                    if(data.guild.plugins.leveling.customMessage !== null) {
                        canalDeSubida.send(data.guild.plugins.leveling.customMessage).replace("{username}", message.author.username).replace("{level}", userXP.level)
                    } else {
                        canalDeSubida.send(`Enhorabuena, **${message.author.username}** has subido al nivel **${userXP.level}** <:uuuu:949634474306568212>`)
                    }
                } else {
                    if(data.guild.plugins.leveling.customMessage !== null) {
                        message.channel.send(data.guild.plugins.leveling.customMessage).replace("{username}", message.author.username).replace("{level}", userXP.level)
                    } else {
                        message.channel.send(`Enhorabuena, **${message.author.username}** has subido al nivel **${userXP.level}** <:uuuu:949634474306568212>`)
                    }
                }
            }
        }
    }


    client.Database.createLog(message, data);
    } else {
        let guildData;
    if(!message.guild.prefix){
        guildData = await client.Database.fetchGuild(message.guild.id);
        message.guild.prefix = guildData.prefix.toLowerCase();
    }
    let prefix = message.guild.prefix;


    if(message.content ===`<@!${message.client.user.id}>` || message.content ===`<@${message.client.user.id}>`){
        return message.reply({ content: `¿Te has olvidado de mi prefix? Te recuerdo que es \`${prefix}\` ^^`, allowedMentions: { repliedUser: true }});
    }


    if(!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


    if(!cmd) {
        const errorNoCommand = new MessageEmbed()
        .setTitle("❌ • Algo ha fallado ")
        .setDescription(`**${commandName}** no existe... pero puedes ver la lista de mis comandos con \`${prefix}commands\` ^^`)
        .setColor("RED")
        return message.reply({ embeds: [errorNoCommand] })
    };


    if(!message.channel.nsfw && cmd.nsfw){
        const errorNoHorny = new MessageEmbed()
            .setTitle("🔞 • Esas cosas se hacen en otro lado... 7w7")
            .setDescription(`No puedes usar este comando fuera de canales nsfw`)
            .setColor("RED")
            .setFooter("Eres un pervertido, lo sabías?")
        return message.reply({ embeds: [errorNoHorny] })
    }


    if(cmd.ownerOnly && message.author.id !== config.ownerId){
        const errorNoCommand = new MessageEmbed()
        .setTitle("❌ • Algo ha fallado ")
        .setDescription(`**${cmd.name}** es un comando reservado para desarrolladores`)
        .setColor("RED")
        return message.reply({ embeds: [errorNoCommand] })
    }

    let userPerms = [];
    cmd.memberPermissions.forEach((perm) => {
        if(!message.channel.permissionsFor(message.member).has(perm)){
            userPerms.push(perm);
        }
    });

    if(userPerms.length > 0 && !message.member.roles.cache.find((r) => r.name.toLowerCase() === config.adminRole.toLowerCase())){
            const errorUserPerms = new MessageEmbed()
            .setTitle("❌ • Error de permisos")
            .setDescription(`Te faltan permisos para poder usar este comando`)
            .addField("Permisos que te faltan", `\`\`\`${userPerms.map((p) => `\`${p}\``).join(", ")}\`\`\``)
            .setColor("RED")
            return message.reply({ embeds: [errorUserPerms] })
    }

    let clientPerms = [];
    cmd.botPermissions.forEach((perm) => {
    if(!message.channel.permissionsFor(message.guild.me).has(perm)){
        clientPerms.push(perm);
        }
    });

    if(clientPerms.length > 0){
        
        client.logger.cmd(`${message.author.tag} used ${cmd.name} - Missing permissions`);
        const errorBotPerms = new MessageEmbed()
    .setTitle("❌ • Error de permisos")
    .setDescription(`No tengo permisos permisos para ejecutar este comando`)
    .addField("Permisos que me faltan", `\`\`\`${clientPerms.map((p) => `\`${p}\``).join(", ")}\`\`\``)
    .setColor("RED")
    return message.reply({ embeds: [errorBotPerms] })
    }


    let userCooldown = cmdCooldown[message.author.id];

    if(!userCooldown){
        cmdCooldown[message.author.id] = {};
        uCooldown = cmdCooldown[message.author.id];
    }

    let time = uCooldown[cmd.name] || 0;

    if(time && (time > Date.now())){
        let timeLeft = Math.ceil((time-Date.now())/1000);
        const errorCooldown = new MessageEmbed()
            .setTitle("⏱ • Relájate un poco")
            .setDescription(`Espera ${timeLeft} segundos para poder volver a usar este comando`)
            .setColor("RED")
        return message.reply({ embeds: [errorCooldown] })
    }

    cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown;


    let userData = await client.Database.fetchUser(message.author.id);
    let mentionedUserData = await client.Database.fetchUser(mentionedUser.user.id);
    if(!guildData) guildData = await client.Database.fetchGuild(message.guild.id);
    let data = {};
    data.user = userData;
    data.mention = mentionedUserData;
    data.guild = guildData;
    data.cmd = cmd;
    data.config = config;

    if(data.user.filters.nsfw == true && cmd.nsfw) {
        const nopeEmbed = new MessageEmbed()
            .setTitle("🔒 • No puedes usar este comando")
            .setDescription("Tienes el filtro NSFW activado. Desactívalo para poder usar este comando.")
            .setColor("RED");
        return message.reply({ embeds: [nopeEmbed] })
    };

    if(data.mention.filters.nsfw == true && cmd.nsfw) {
        const nopeEmbed = new MessageEmbed()
            .setTitle("🔒 • No puedes usar este comando")
            .setDescription(`**${mentionedUser.user.username}** el filtro NSFW activado`)
            .setColor("RED");
        return message.reply({ embeds: [nopeEmbed] })
    };


    if(!data.user.ranks.partner === true && cmd.partnerOnly === true) {
        const errorNoPartner = new MessageEmbed()
            .setTitle("❌ • No puedes hacer eso")
            .setDescription(`Necesitas ser Partner de Goat-Chan o estar en un servidor partner para usar este comando`)
            .setFooter("Más información próximamente")
            .setColor("RED");
        return message.reply({ embeds: [errorNoPartner] })
    };

    if(cmd.partnerOnly === true && !data.guild.partner === true && !data.user.ranks.partner === true) {
        const errorNoPartner = new MessageEmbed()
            .setTitle("❌ • No puedes hacer eso")
            .setDescription(`Necesitas ser Partner de Goat-Chan o estar en un servidor partner para usar este comando`)
            .setFooter("Más información próximamente")
            .setColor("RED");
        return message.reply({ embeds: [errorNoPartner] })
    };

    if(data.user.banned === true) {
        const errorBanned = new MessageEmbed()
            .setTitle("🪓 • No puedes usar mis comandos")
            .setDescription(`Has sido baneado del uso del bot`)
            .setColor("RED");
        return message.reply({ embeds: [errorBanned] })
    };

    cmd.execute(client, message, args, data);
    client.logger.cmd(`${message.author.tag} used ${cmd.name}`);


    if(data.guild.plugins.leveling.enabled === true) {
        let random = Math.floor(Math.random() * 45 ) + 30;
        const levelUp = await Levels.appendXp(
            message.author.id,
            message.guild.id,
            random
        );
        if(levelUp) {
            const userXP = await Levels.fetch(message.author.id, message.guild.id);

            if(data.guild.plugins.leveling.sendMessage === true) {
                if(data.guild.plugins.leveling.levelNsgChannel !== null) {
                    let canalDeSubida = await client.tools.resolveChannel(data.guild.plugins.leveling.levelNsgChannel, message.guild);
                    if(data.guild.plugins.leveling.customMessage !== null) {
                        canalDeSubida.send(data.guild.plugins.leveling.customMessage).replace("{username}", message.author.username).replace("{level}", userXP.level)
                    } else {
                        canalDeSubida.send(`Enhorabuena, **${message.author.username}** has subido al nivel **${userXP.level}** <:uuuu:949634474306568212>`)
                    }
                } else {
                    if(data.guild.plugins.leveling.customMessage !== null) {
                        message.channel.send(data.guild.plugins.leveling.customMessage).replace("{username}", message.author.username).replace("{level}", userXP.level)
                    } else {
                        message.channel.send(`Enhorabuena, **${message.author.username}** has subido al nivel **${userXP.level}** <:uuuu:949634474306568212>`)
                    }
                }
            }
        }
    }


    client.Database.createLog(message, data);
    }

    } catch(err) {
        console.error(err);
    }

};