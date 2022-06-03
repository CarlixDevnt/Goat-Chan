const { MessageEmbed } = require("discord.js")
const randomAnimal = require('random-animals-api'); 

module.exports = {
    name: "duck",
    usage: ["Una foto de un pato ```{prefix}duck```"],
    enabled: true,
    aliases: [],
    category: "Imágenes",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 3000,

    async execute(client, message, args, data){
        try{
            randomAnimal.duck().then((duck) => {
                    let posibility = Math.floor(Math.random() * 30);
                    if(posibility === 3) {
                        const embed = new MessageEmbed()
                  .setImage(duck)
                  .setColor("RANDOM")
                  .setDescription("🦆 • **Un patoooo que va cantando alegrementeee cuaack cuaaack ^^**");
                  message.reply({ embeds: [embed] });
                    } else{
                        const embed = new MessageEmbed()
                        .setImage(duck)
                        .setColor("RANDOM")
                        .setDescription("🦆 • **Toma un pato**");
                        message.reply({ embeds: [embed] });
                    }
                  })
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