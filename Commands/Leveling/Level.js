const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "level",
    usage: ["Obtén tu nivel de uso del bot o el de otro usuario ```{prefix}level (@usuario)```"],
    enabled: true,
    aliases: ["rank"],
    category: "Niveles",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    
    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,


    async execute(client, message, args, data){
		try {
            let soon = new MessageEmbed()
                .setTitle("❌ • Función bloqueada")
                .setDescription(`Mis desarrolladores han bloqueado temporalmente esta función. Espera a que la desbloqueen para poder usar este comando`)
                .setColor("RED")
                return message.reply({ embeds: [soon] })
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