const { MessageEmbed } = require("discord.js")
const { TicTacToe } = require('discord-gamecord')

module.exports = {
    name: "ttt",
    usage: ["Juega al clásico 3 en raya contra otro jugador ```{prefix}ttt <@usuario>```"],
    enabled: true,
    aliases: [],
    category: "Minijuegos",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 10000,

    async execute(client, message, args, data){
        try{
            new TicTacToe({
                message: message,
                slash_command: false,
                opponent: message.mentions.users.first(),
                embed: {
                  title: '🧮 • 3 en Raya',
                  overTitle: 'Se acabó la partida',
                  color: 'RANDOM',
                },
                oEmoji: '🔵',
                xEmoji: '➕',
                blankEmoji: '➖',
                oColor: 'PRIMARY',
                xColor: 'DANGER',
                waitMessage: 'Esperando por el oponente...',
                turnMessage: '{emoji} • Its now **{player}** turn!',
                askMessage: 'Hey {opponent}, {challenger} te ha desafiado a un 3 en Raya, aceptas?',
                cancelMessage: 'Parece que {opponent} no quiso jugar',
                timeEndMessage: '{opponent} no respondió a tiempo, por lo que cancelaré la partida',
                drawMessage: 'Empate',
                winMessage: '{emoji} • **{winner}** ha ganado!',
                gameEndMessage: 'El juego nunca acabó',
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