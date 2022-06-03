const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "luckcheck",
    usage: ["Comprueba tu suerte o la de otro usuario ```{prefix}luckcheck (@usuario)```"],
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
            let cats = ["https://media1.tenor.com/images/50ad01be3ce03735edf5131272bbfa6d/tenor.gif?itemid=17230000", "https://media1.tenor.com/images/ef8311785a0ae48ae2ebf5871a5ce0df/tenor.gif?itemid=17603476", "https://i.pinimg.com/originals/8f/46/c5/8f46c58eb5ef0f59bced2f795d5dfde2.gif", "https://media1.tenor.com/images/bead0ffe77a3fd513511c05dafb492e6/tenor.gif?itemid=18105609", "https://i0.wp.com/media1.tenor.com/images/acc85d7ebcf4930a293201c2469c481e/tenor.gif", "https://onbeachhome.com/wp-content/uploads/2021/02/Cute-Cat-GIF.gif"];
            let randomcat = cats[Math.floor(Math.random() * cats.length)];
          const mention = message.mentions.members.first();
          if(!mention) {
            const lucky = new MessageEmbed()
            .setTitle(`🍀 • ¡Tuviste suerte, **${message.author.username}**!`)
            .setDescription("Vaya, nada malo ha pasado, not funny")
            .setColor("GREEN")
            .setImage(randomcat);
      
            const rickroll = new MessageEmbed()
            .setTitle(`🥀 • No has tenido mucha suerte, **${message.author.username}**`)
            .setDescription("¡Has sido rickrolleado!")
            .setColor("RED")
            .setImage("https://media1.tenor.com/images/8a390326148f845c0e26c23d56b7fde9/tenor.gif?itemid=17877057");
      
            const furryping = new MessageEmbed()
            .setTitle(`🪀 •Me compadezco de ti, **${message.author.username}**`)
            .setDescription("Ping furro!")
            .setColor("#9932cc")
            .setImage("https://media.discordapp.net/attachments/865286430996299776/865286473627598908/troleo.png");
      
            let n100 = Math.floor(Math.random()*100+1);
            if(n100 <= 5) {
              message.reply({ embeds: [furryping] })
            } else if(n100 <= 45) {
              message.reply({ embeds: [rickroll] })
            } else {
              message.reply({ embeds: [lucky] })
            }
          } else {
            const lucky = new MessageEmbed()
            .setTitle(`🍀 • ¡**${mention.user.username}** ha tenido suerte!`)
            .setDescription("Vaya, nada malo ha pasado, not funny")
            .setColor("GREEN")
            .setImage(randomcat);
      
            const rickroll = new MessageEmbed()
            .setTitle(`🥀 • Parece que la suerte no está del lado de **${mention.user.username}**`)
            .setDescription("¡Has sido rickrolleado!")
            .setColor("RED")
            .setImage("https://media1.tenor.com/images/8a390326148f845c0e26c23d56b7fde9/tenor.gif?itemid=17877057");
      
            const furryping = new MessageEmbed()
            .setTitle(`🪀 • Me compadezco de **${mention.user.username}**`)
            .setDescription("Ping furro!")
            .setColor("#9932cc")
            .setImage("https://media.discordapp.net/attachments/865286430996299776/865286473627598908/troleo.png");
      
            let n100 = Math.floor(Math.random()*100+1);
            if(n100 <= 5) {
              message.channel.send(`<@${mention.user.id}>`)
              message.channel.send({ embeds: [furryping] })
            } else if(n100 <= 45) {
              message.channel.send({ embeds: [rickroll] })
            } else {
              message.channel.send({ embeds: [lucky] })
            }
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