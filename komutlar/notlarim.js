const Discord = require('discord.js')
const db = require('quick.db')

    exports.run = (client, message, args) => {
        // Let Tanımları
        let not1 = db.fetch(`codemarefinot1_${message.author.id}`)
        let not2 = db.fetch(`codemarefinot2_${message.author.id}`)
        let not3 = db.fetch(`codemarefinot3_${message.author.id}`)

        const codemarefi = new Discord.MessageEmbed()
        .setDescription(`
            ${message.author} **İşte Aldığın Notlar**
            1- ${not1 || "Datada Veri Yok"}\n
            2- ${not2 || "Datada Veri Yok"}\n
            3- ${not3 || "Datada Veri Yok"}
        `)
        .setColor('#ff0000')
        message.channel.send(codemarefi)
    } //CodeMareFi - CMF / MareFi |\_/|

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Notlarım','NOTLARIM'],
    permLevel: 0
}

exports.help = {
    name: 'notlarım'
}