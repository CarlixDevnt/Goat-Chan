const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "filters",
    usage: ["Modifica tus filtros de seguridad ```{prefix}filters <nsfw/letters> <enable/disable>```"],
    enabled: true,
    aliases: [],
    category: "Perfiles",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],

    nsfw: false,
    partnerOnly: false,
    ownerOnly: false,
    cooldown: 10000,

    async execute(client, message, args, data){
        try{
            if(!args[0]) {
                const errorNoArgs = new MessageEmbed()
                    .setTitle("❌ • Algo ha fallado")
                    .setDescription("No has especificado el filtro a modificar")
                    .setColor("RED");
                return message.reply({ embeds: [errorNoArgs] })
            };

            if(!data.user.filters) {
                data.user.filters = { letters: false, nsfw: false }
                data.user.markModified('user.filters');
                await data.user.save();
            };

            if(args[0].toLowerCase() === "letters"){
                if(!args[1]) {
                    const errorNoArgs = new MessageEmbed()
                    .setTitle("❌ • Algo ha fallado")
                    .setDescription("No has especificado la acción a realizar con el filtro")
                    .setColor("RED");
                return message.reply({ embeds: [errorNoArgs] })
                };

                if(args[1].toLowerCase() === "enable") {
                    data.user.filters.letters = true;
                    data.user.markModified('filters');
                    await data.user.save();
                    const changedFilter = new MessageEmbed()
                        .setTitle("🔒 • La operación ha sido un éxito")
                        .setDescription("El filtro **Letters** ahora está __activado__")
                        .setColor("GREEN");
                    return message.reply({ embeds: [changedFilter] })
                };

                if(args[1].toLowerCase() === "disable") {
                    data.user.filters.letters = false;
                    data.user.markModified('filters');
                    await data.user.save();
                    const changedFilter = new MessageEmbed()
                        .setTitle("🔓 • La operación ha sido un éxito")
                        .setDescription("El filtro **Letters** ahora está __desactivado__")
                        .setColor("GREEN");
                    return message.reply({ embeds: [changedFilter] })
                };
            };

            if(args[0].toLowerCase() === "nsfw"){
                if(!args[1]) {
                    const errorNoArgs = new MessageEmbed()
                    .setTitle("❌ • Algo ha fallado")
                    .setDescription("No has especificado la acción a realizar con el filtro")
                    .setColor("RED");
                return message.reply({ embeds: [errorNoArgs] })
                };

                if(args[1].toLowerCase() === "enable") {
                    data.user.filters.nsfw = true;
                    data.user.markModified('filters');
                    await data.user.save();
                    const changedFilter = new MessageEmbed()
                        .setTitle("🔒 • La operación ha sido un éxito")
                        .setDescription("El filtro **NSFW** ahora está __activado__")
                        .setColor("GREEN");
                    return message.reply({ embeds: [changedFilter] })
                };

                if(args[1].toLowerCase() === "disable") {
                    data.user.filters.nsfw = false;
                    data.user.markModified('filters');
                    await data.user.save();
                    const changedFilter = new MessageEmbed()
                        .setTitle("🔓 • La operación ha sido un éxito")
                        .setDescription("El filtro **NSFW** ahora está __desactivado__")
                        .setColor("GREEN");
                    return message.reply({ embeds: [changedFilter] })
                };
            };
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