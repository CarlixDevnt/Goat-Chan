const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "dicksize",
    usage: ["Mide el tamaño de miembro de alguien ```{prefix}dicksize (@usuario)```"],
    enabled: true,
    aliases: ["pp"],
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
    const ppSize = Math.floor(Math.random() * 28);
      if(target) {
        if(target.user.id === client.user.id) {
          const errorEmbed = new MessageEmbed()
          .setTitle(`🔥 • Ha ocurrido un fallo técnico...`)
          .setDescription(`S-soy una chica, no tengo... Espera... ¿Es q-que quieres com-comprobarlo...?`)
          .setColor("RED");
    
        message.reply({ embeds: [errorEmbed] });
        } else {
          const ppSizeEmbed = new MessageEmbed()
          .setTitle(`🍆 • RaboStats para ${target.user.username}`)
          .setDescription(`**Longitud:** ${ppSize}cm`)
          .setColor("RANDOM");
    
        message.reply({ embeds: [ppSizeEmbed] });
        }
    
      } else {
    const ppSizeEmbed = new MessageEmbed()
      .setTitle(`🍆 • RaboStats para ${message.author.username}`)
      .setDescription(`**Longitud:** ${ppSize}cm`)
      .setColor("RANDOM");

    message.reply({ embeds: [ppSizeEmbed] });
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