const { MessageEmbed } = require("discord.js");
const BombSweeper = require("bombsweeper.js");

module.exports = {
    name: "minesweeper",
    usage: ["Juega al clásico Buscaminas ```{prefix}minesweeper```"],
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
            const emojis = {
                0: "||:zero:||",
                1: "||:one:||",
                2: "||:two:||",
                3: "||:three:||",
                4: "||:four:||",
                5: "||:five:||",
                6: "||:six:||",
                7: "||:seven:||",
                8: "||:eight:||",
                "*": "||:bomb:||",
              };
              let filas = 10;
              let cols = 10;
              const bombsweeper = new BombSweeper(filas, cols);
        
              let bombas = 20;
              bombsweeper.PlaceBombs(bombas);
        
              let tablero = bombsweeper.board;

              for (let j = 0; j < 10; j++) {
                for (let i = 0; i < 10; i++) {
                  tablero[i][j] = emojis[tablero[i][j]];
                }
              }
        
              message.channel.send(tablero);
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