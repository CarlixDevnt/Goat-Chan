const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "biography",
    usage: ["Edita tu biografía dentro del bot ```{prefix}biography set <texto>\n{prefix}biography delete```"],
    enabled: true,
    aliases: ["bio"],
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
                data.user.profile.bio = null;
                data.user.markModified('profile');
                await data.user.save();
                const deletedBio = new MessageEmbed()
                .setTitle("✅ • La operación ha sido un éxito")
                .setDescription("Se ha eliminado tu biografía")
                .setColor("GREEN");
            return message.reply({ embeds: [deletedBio] })
            };

            if(args[0].toLowerCase() === "set"){
                let biographyText = args.slice(1).join(" ")
                if(!biographyText) {
                    const errorNoArgs = new MessageEmbed()
            .setTitle("❌ • Algo ha fallado")
            .setDescription("No has escrito tu biografía")
            .setColor("RED");
        return message.reply({ embeds: [errorNoArgs] })
                } else {
                    if (biographyText.length > 200) {
                        const errorToLong = new MessageEmbed()
                        .setTitle("❌ • Algo ha fallado")
                        .setDescription(`Tu biografía es muy larga,${message.author.username}-Senpai...`)
                        .setColor("RED");
                    return message.reply({ embeds: [errorToLong] })
                    } else {
                        data.user.profile.bio = biographyText;
                        data.user.markModified('profile');
                        await data.user.save();
                        const deletedBio = new MessageEmbed()
                        .setTitle("✅ • La operación ha sido un éxito")
                        .setDescription("Se ha modificado tu biografía")
                        .addField("Nueva biografía:", biographyText)
                        .setColor("GREEN");
                    return message.reply({ embeds: [deletedBio] })
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