const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "avatar",
    usage: ["Obtén el avatar de un usuario ```{prefix}avatar (@usuario)```"],
    enabled: true,
    aliases: ["pfp"],
    category: "Imágenes",
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
            let user = message.mentions.users.first() || message.author;
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Avatar ${user.username}`)
                .setDescription(
                `[Avatar Link](${user.displayAvatarURL({
                            size: 4096,
                            dynamic: true,
                            format: "png",
                                })})`
                            )
                .setImage(user.avatarURL({ size: 4096, dynamic: true, format: "png" }));
            message.reply({ embeds: [embed] });
        }catch(err){
            client.logger.error(`Algo ha fallado al usar el comando ${data.cmd.name}`)
            console.log(err)
            const errorKaboom = new MessageEmbed()
                .setTitle("❌ · Algo raro ha pasado")
                .setDescription(`No se ha podido ejecutar este comando. Vuelve a intentarlo; y si esto sigue pasando, avisa a un desarrollador.`)
                .addField("Error log", `\`\`\`${err}\`\`\``)
                .setColor("RED")
            return message.reply({ embeds: [errorKaboom] })
        }
    }
}