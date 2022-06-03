const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "howgay",
    usage: ["Mide el porcentaje de homosexualidad de alguien ```{prefix}howgay (@usuario)```"],
    enabled: true,
    aliases: [],
    category: "Diversión",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            let target = message.mentions.members.first();
            let rng = Math.floor(Math.random() * 101);
      if(target) {
        if(target.user.id === client.user.id) {
          const errorEmbed = new MessageEmbed()
          .setTitle(`🏳 • Ha ocurrido un fallo técnico...`)
          .setDescription(`No soy homosexual, calcular este porcentaje no tiene sentido`)
          .setColor("RED");
    
        message.reply({ embeds: [errorEmbed] });
        } else {
            const howGayEmbed = new MessageEmbed()
            .setTitle(`🌈 • Porcentaje de homosexualidad`)
            .setDescription(`${target.user.username} es ${rng}% gay`)
            .setColor("RANDOM");
      
          message.reply({ embeds: [howGayEmbed] });
        }
    
      } else {
        const howGayEmbed = new MessageEmbed()
        .setTitle(`🌈 • Porcentaje de homosexualidad`)
        .setDescription(`${message.author.username} es ${rng}% gay`)
        .setColor("RANDOM");
  
      message.reply({ embeds: [howGayEmbed] });
      }
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