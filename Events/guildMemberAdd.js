module.exports = async(client, member) => {
    try {
        let guild = member.guild;
        let guildData = await client.Database.fetchGuild(guild.id); 
        if(!guildData.channels.welcome.enabled) return; 
        
        let welcomeChannel = await client.tools.resolveChannel(guildData.channels.welcome.channel, guild); 
        if(!welcomeChannel) return; 
        
        let welcomeMsg = (guildData.channels.welcome.message === null || guildData.channels.welcome.message === "" || guildData.channels.welcome.message === " ") ? "Hey, **{user.ping}**, te doy la bienvenida a **{guild.name}**" : guildData.channels.welcome.message;


        let finalMsg = await welcomeMsg
        .replace(/{user.ping}/g, `${member.user}`)
        .replace(/{user.name}/g, `${member.user.username}`)
        .replace(/{user.id}/g, `${member.user.id}`)
        .replace(/{user.tag}/g, `${member.user.tag}`)
        .replace(/{guild.name}/g, `${guild.name}`)
        .replace(/{guild.id}/g, `${guild.id}`)
        .replace(/{guild.totalUser}/g, `${guild.memberCount}`);
    
        return welcomeChannel.send(finalMsg) 
    
    } catch (e) {
        console.log(e);
    }
    
    };