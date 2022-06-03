const { MessageEmbed } = require("discord.js")
const { GuessThePokemon } = require('discord-gamecord')

module.exports = {
    name: "guessthatpokemon",
    usage: ["Juega a adivinar el pokémon ```{prefix}guessthatpokemon```"],
    enabled: true,
    aliases: ["gtp"],
    category: "Minijuegos",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: true,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            new GuessThePokemon({
                message: message,
                slash_command: false,
                embed: {
                  title: '❓ • ¿Cuál es este Pokémon?',
                  footer: 'Piensa bien, sólo tienes una oportunidad y un minuto para responder',
                  color: 'RANDOM',
                },
                time: 60000,
                thinkMessage: '**Pensando...**',
                winMessage: '👍 • ¡Has acertado! El Pokémon era **{pokemon}**',
                stopMessage: '⛔ • ¡Se acabó el tiempo! El pokémon era **{pokemon}**',
                incorrectMessage: '❌ • ¡Casi! El Pokémon era **{pokemon}**',
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