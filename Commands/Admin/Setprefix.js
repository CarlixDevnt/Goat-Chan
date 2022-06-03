const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "setprefix",
    usage: ["Set the prefix for your server```{prefix}setprefix <prefix>```"],
    enabled: true,
    aliases: ["prefix"],
    category: "Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //--- Ajustes ---
    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{

            if(!args[0]){
                return client.embed.usage(message, data);
            }
            let prefix = args.join(" ");
            data.guild.prefix = prefix;
            await data.guild.save();
            message.guild.prefix = prefix.toLowerCase();
            let changedPrefix = new MessageEmbed()
            .setTitle("📞 • Cambio de prefix")
            .setDescription(`El prefix ha cambiado y ahora es \`${prefix}\``)
            .setColor("GREEN")
            return message.reply({ embeds: [changedPrefix] });

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