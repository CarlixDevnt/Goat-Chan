const { MessageEmbed } = require("discord.js")
const malScraper = require('mal-scraper');

module.exports = {
    name: "searchanime",
    usage: ["Obtén información sobre un anime ```{prefix}searchanime <anime>```"],
    enabled: true,
    aliases: ["animesearch"],
    category: "Utilidad",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const search = `${args}`;
            if(!search)
            return message.reply('Necesitas especificar el nombre de un anime');
    
            malScraper.getInfoFromName(search)
              .then((data) => {
              const malEmbed = new Discord.MessageEmbed()
                .setAuthor(`Resultados para ${args}`.split(',').join(' '))
                .setThumbnail(data.picture)
                .setColor('#ffc1cc') 
                .addField('Título en inglés', data.englishTitle, true)
                .addField('Título en japonés', data.japaneseTitle, true)
                .addField('Género', data.type, true)
                .addField('Episodios', data.episodes, true)
                .addField('Valoración', data.rating, true)
    
    
                message.reply({ embeds: [malEmbed] });
    
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