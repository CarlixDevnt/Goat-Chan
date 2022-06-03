const { MessageEmbed } = require("discord.js")
const Short = require("tinyurl");

module.exports = {
    name: "tinyurl",
    usage: ["Haz una URL más corta ```{prefix}tinyurl <url> ```"],
    enabled: true,
    aliases: ["shorturl"],
    category: "Utilidad",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            if (!args[0] || !args[0].startsWith("http")) return message.channel.send("❌ | Debes proporcionar un link válido");

            async function ShortLink(Type, Link, Aliase) {
              if (Type === "aliase") {
                const Data = await Short.shortenWithAlias({ url: Link, alias: Aliase }).then(function(res) {
                   return { data: res };
                }, function (err) {
                  if (err) return "Unable";
                });
                return Data;
              } else {
                const Data = await Short.shorten(Link).then(function(res) {
                  return { data: res };
                }, function (err) {
                  if (err) return "Unable";
                });
                return Data;
              };
            };
        
            const URL = args[0], Aliases = args.slice(1).join("-");
            const Pro = await ShortLink(Aliases ? "aliase" : "Other", URL, Aliases ? Aliases : "None");
        
            const embed = new Discord.MessageEmbed()
            .setColor("#73fffb")
            .setTitle(Pro.data === "Unable" || Pro.data === "Error" ? "❌ | No he podido acortar la URL" : "✔️ | URL Acortada")
            .setDescription(Pro.data === "Unable" || Pro.data === "Error" ? "❌ | No he podido acortar la URL" : `Link - ${Pro.data}`)
            .setFooter(`Solicitada por ${message.author.username}`)
            .setTimestamp();
        
            return message.reply({ embeds: [embed] });
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