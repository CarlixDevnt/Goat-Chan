const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "roles",
    usage: ["Obtén una lista de roles del servidor ```{prefix}roles```"],
    enabled: true,
    aliases: [],
    category: "General",
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

            // Get a list of roles
            let roleCount = message.guild.roles.cache.map(x => "<@&" + x.id + ">").join(" ")
            const rolesEmbed = new MessageEmbed()
            .setAuthor(`• Roles de ${message.guild.name}`)
            .setDescription(roleCount)
            .setColor("#3dffec")
            return message.channel.send({ embeds: [rolesEmbed] })
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