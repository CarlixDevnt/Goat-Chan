const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "username",
    usage: ["Edita tu nombre de usuario dentro del bot ```{prefix}username set <nombre>\n{prefix}username delete```"],
    enabled: true,
    aliases: ["myname"],
    category: "Perfiles",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 10000,

    async execute(client, message, args, data){
        try{
            if(!args[0]){
                const errorNoArgs = new MessageEmbed()
            .setTitle("❌ • Algo ha fallado")
            .setDescription("No has especificado la acción a realizar")
            .setColor("RED");
        return message.reply({ embeds: [errorNoArgs] })
            };

            if(!data.user.profile){
                data.user.profile = { name: message.author.username, bio:  null, birthday: null, color: null, favPokemon: null }
                data.user.markModified('profile');
                await data.user.save();
            };

            if(args[0].toLowerCase() === "delete"){
                data.user.profile.username = message.author.username;
                data.user.markModified('profile');
                await data.user.save();
                const deletedUsername = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha eliminado tu nombre de usuario")
                .setColor("GREEN");
            return message.reply({ embeds: [deletedUsername] })
            };

            if(args[0].toLowerCase() === "set"){
                let usernamegraphyText = args.slice(1).join(" ")
                if(!usernamegraphyText) {
                    const errorNoArgs = new MessageEmbed()
            .setTitle("❌ • Algo ha fallado")
            .setDescription("No has escrito tu nombre de usuario")
            .setColor("RED");
        return message.reply({ embeds: [errorNoArgs] })
                } else {
                    if (usernamegraphyText.length > 50) {
                        const errorToLong = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription(`Tu nombre de usuario es muy largo,${message.author.username}-Senpai...`)
                        .setColor("RED");
                    return message.reply({ embeds: [errorToLong] })
                    } else {
                        data.user.profile.username = usernamegraphyText;
                        data.user.markModified('profile');
                        await data.user.save();
                        const modifiedUsername = new MessageEmbed()
                        .setTitle("✅ • La operación ha sido un éxito")
                        .setDescription("Se ha modificado tu nombre de usuario")
                        .addField("Nueva nombre de usuario:", usernamegraphyText)
                        .setColor("GREEN");
                    return message.reply({ embeds: [modifiedUsername] })
                    }
                }
            };
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