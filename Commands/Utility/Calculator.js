const { MessageEmbed } = require("discord.js")
const simplydjs = require("simply-djs")

module.exports = {
    name: "calculator",
    usage: ["Una calculadora simple sacada del módulo **Simply-djs** ```{prefix}calculator```"],
    enabled: true,
    aliases: ["calc"],
    category: "Utilidad",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            simplydjs.calculator(message, {
                embedColor: '#3dffec',
                })
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