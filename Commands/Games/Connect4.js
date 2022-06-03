const { MessageEmbed } = require("discord.js")
const { Connect4 } = require('discord-gamecord')

module.exports = {
    name: "connect4",
    usage: ["Juega al clásico Conecta 4 contra otro jugador ```{prefix}connect4 <@usuario>```"],
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
            new Connect4({
                message: message,
                opponent: message.mentions.users.first(),
                embed: {
                  title: '4 en raya',
                  color: 'RANDOM',
                },
                emojis: {
                  player1: '🔵',
                  player2: '🟡'
                },
                turnMessage: '{emoji} • Es el turno de **{player}**',
                winMessage: '{emoji} • **{winner}** Ha ganado',
                gameEndMessage: 'El juego ha acabado sin finalizar',
                drawMessage: 'Ha habido un empate',
                askMessage: 'Hey {opponent}, {challenger} te propone jugar al 4 en raya...',
                cancelMessage: 'Parece que tu adversario no quiso',
                timeEndMessage: 'Pues como el tío no ha contestado, pues se cancela el juego',
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