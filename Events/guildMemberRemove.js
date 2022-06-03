module.exports = async(client, member) => {
    try {
        let guild = member.guild;
        let guildData = await client.Database.fetchGuild(guild.id); 
        if(!guildData.channels.goodbye.enabled) return; 
    
        let goodbyeChannel = await client.tools.resolveChannel(guildData.channels.goodbye.channel, guild); 
        if(!goodbyeChannel) return; 
    
        let goodbyeMsg = (guildData.channels.goodbye.message === null || guildData.channels.goodbye.message === "" || guildData.channels.goodbye.message === " ") ? "**{user.ping}** se ha ido del servidor..." : guildData.channels.goodbye.message; 


        let finalMsg = await goodbyeMsg
        .replace(/{user.ping}/g, `${member.user}`)
        .replace(/{user.name}/g, `${member.user.username}`)
        .replace(/{user.id}/g, `${member.user.id}`)
        .replace(/{user.tag}/g, `${member.user.tag}`)
        .replace(/{guild.name}/g, `${guild.name}`)
        .replace(/{guild.id}/g, `${guild.id}`)
        .replace(/{guild.totalUser}/g, `${guild.memberCount}`);
    
        return goodbyeChannel.send(finalMsg) 
    
    } catch (e) {
        console.log(e);
    }
    
    };