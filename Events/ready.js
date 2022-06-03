module.exports = async(client) => {

    console.log('Se ha activado a Goat-Chan')
    client.user.setPresence({ status: "online" });
    setInterval(() => {
        let status = [
            `Ahora en ${client.guilds.cache.size} servidores <3`,
            `Onii-Chan...`,
            `v1.5.1, por y para vosotros <3`,
            `La cabra más sexy de todo el metaverso`,
            `Por CarlixPerz <3`,
            `No apta para gringos`,
            `Te recomiendo visitar el Jolteon's Dubs`,
            `Os amo, partners <3`,
            `Prueba también a Oxygen`,
            `Ahora con más... bueno, olvídalo`,
            `Ahora el aquamarina se ve más claro`,
            `No quieres ver lo que tengo debajo de las vendas...`,
            `I Gotta Feeling...`
        ]
        let randomStatus = status[Math.floor(Math.random() * status.length)]
        client.user.setActivity(`gc!help • ${randomStatus}`, { type: "WATCHING" });
    },120000)
}