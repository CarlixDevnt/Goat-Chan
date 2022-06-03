const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "8ball",
    usage: ["Deja que la bola 8 mágica responda a tus preguntas ```{prefix}8ball <question>```"],
    enabled: true,
    aliases: ["eightball"],
    category: "Diversión",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            if(!args[0]) {
                const error = new MessageEmbed()
                    .setTitle("❌ • Error de parámetros")
                    .setDescription("Debes especificar un argumento como pregunta de tipo sí/no")
                    .setColor("RED")
                return message.reply({ embeds: [error] })
            };

            let replies = [
                'Sí',
                'No',
                'Eso espero',
                'Ni en tus mejores sueños',
                'Ni de broma',
                'Hey, no preguntes esas cosas aquí, guárdatelas para el MD...',
                'No creo',
                'Mejor pregúntame otra cosa...',
                'No creo que pueda ser posible',
                'Estoy segura de que sí',
                'Estoy segura de que no',
                'Es probable', 'No es muy probable',
                'Te puedo asegurar que eso es falso',
                '¡Vaya! Me falla la conexión. Gracias, Movistar...',
                'Imposible',
                'Obvio',
                'Te pido encarecidamente que me dejes descansar...',
                'JAMÁS!',
                'Pfft',
                'Oye, que no vengo del futuro, búscate una vidente profesional',
                'Será mejor que no te lo diga',
                'A nadie le importa',
                'No es mi problema',
                'Pregúntale a otro',
                'No, no te voy a decir onichan, Cap'
            ];

            let result = replies[Math.floor((Math.random() * replies.length))];
            let question = args.slice(0).join(" ");

            const embed = new MessageEmbed()
                .setTitle("🎱 • 8ball")
                .addField(question, result)
                .setColor("RANDOM");
            message.reply({ embeds: [embed] })

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