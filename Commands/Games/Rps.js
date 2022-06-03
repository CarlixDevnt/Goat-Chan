const { MessageEmbed } = require("discord.js")
const { RockPaperScissors } = require('discord-gamecord')

module.exports = {
    name: "rps",
    usage: ["Juega al clásico Piedra, Papel o Tijeras contra otro jugador ```{prefix}rps <@usuario>```"],
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
            new RockPaperScissors({
                message: message,
                slash_command: false,
                opponent: message.mentions.users.first(),
                embed: {
                  title: '📌 • Piedra, Papel o Tijeras',
                  description: 'Pulsa un botón de los de abajo para elegir',
                  color: 'RANDOM',
                },
                buttons: {
                  rock: 'Piedra',
                  paper: 'Papel',
                  scissors: 'Tijeras',
                },
                emojis: {
                  rock: '🌑',
                  paper: '📃',
                  scissors: '✂️',
                },
                othersMessage: 'No puedes participar en esta partida',
                chooseMessage: 'Has elegido {emoji}',
                noChangeMessage: 'No puedes cambiar tu elección',
                askMessage: 'Hey {opponent}, {challenger} te ha desafiado a un Piedra, Papel o Tijeras; aceptas?',
                cancelMessage: 'Parece que {opponent} no quiso jugar',
                timeEndMessage: '{opponent} no ha contestado, por lo que cancelaré la partida',
                drawMessage: 'Empate',
                winMessage: '{winner} ha ganado!',
                gameEndMessage: 'La partida nunca acabó',
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