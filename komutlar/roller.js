const Discord = require('discord.js')

    exports.run = async(client, message, args) => {
        const codemarefiroller = new Discord.MessageEmbed()
        .setDescription(`
            **Sunucuda Toplam \`${message.guild.roles.cache.size}\` Adet Rol Var**
            **Rollerin Listesi;**
            \n
            ${message.guild.roles.cache.map(r => `${r}`).join('\n ')}
        `)
        .setColor('RANDOM')
        message.channel.send(codemarefiroller)
    } //CodeMareFi :)

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Roller','ROLLER'],
    permLevel: 0
}

exports.help = {
    name: 'roller'
}