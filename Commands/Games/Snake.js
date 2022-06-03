const { MessageEmbed } = require("discord.js")
const { Snake } = require('discord-gamecord')

module.exports = {
    name: "snake",
    usage: ["Juega al clásico Snake ```{prefix}snake```"],
    enabled: true,
    aliases: ["snaek", "snek"],
    category: "Minijuegos",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 20000,

    async execute(client, message, args, data){
        try{
            new Snake({
                message: message,
                embed: {
                title: '🐍 • Snake',
                color: 'RANDOM',
                OverTitle: "Se acabó la partida",
                },
                snake: { head: '🟢', body: '🟩', tail: '🟢' },
                emojis: {
                  board: '⬛',
                  food: '🍎',
                  up: '⬆️',
                  right: '➡️',
                  down: '⬇️',
                  left: '⬅️',
                },
                stopButton: 'Parar',
                othersMessage: 'No puedes usar los botones en esta partida',
              }).startGame();
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