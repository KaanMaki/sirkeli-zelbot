const Discord = require('discord.js')
const db = require('quick.db')

    exports.run = (client, message, args) => {
        // Hata
        if(!args[0]){
            const kadirfi = new Discord.MessageEmbed()
            .setDescription(`**Lütfen Komutu Doğru Kullanın**
                \n Doğru Kullanım: \`\n.not-al 1 Not Mesaj\`\n \`.not-al 2 Not Mesaj\`\n \`.not-al 3 Not Mesaj\`
            `)
            .setColor('#ff0000')
            return message.channel.send(kadirfi)
        }

        let zaman = new Date()
        let kadirfi = zaman.getFullYear() + "/" + (zaman.getMonth() +1) + "/" + zaman.getDate() + " | " + zaman.getHours() + ":" + zaman.getMinutes() + ":" + zaman.getSeconds();

        // Coded By KadirFi & MareFi
        if(args[0] === "1"){
            // Let Mesajları
            let mesaj = args.slice(1).join(' ')

            // Data İşlemleri & Mesaj
            db.set(`codemarefinot1_${message.author.id}`, [mesaj + "  \n`" + kadirfi + "`"])
            message.channel.send('1. Notunuz Data\'ya Kayıt Edildi... \n\n `!notlarım`')
        }

        if(args[0] === "2"){
            // Let Mesajları
            let mesaj2 = args.slice(1).join(' ')

            // Data İşlemleri & Mesaj
            db.set(`codemarefinot2_${message.author.id}`, [mesaj2 + "  \n`" + kadirfi + "`"])
            message.channel.send('2. Notunuz Data\'ya Kayıt Edildi... \n\n `!notlarım`')
        }

        if(args[0] === "3"){
            // Let Mesajları
            let mesaj3 = args.slice(1).join(' ')

            // Data İşlemleri & Mesaj
            db.set(`codemarefinot3_${message.author.id}`, [mesaj3 + "  \n`" + kadirfi + "`"])
            message.channel.send('3. Notunuz Data\'ya Kayıt Edildi... \n\n `!notlarım`')
        }

        if(args[0] > 3){
            message.reply('En fazla 3 not alabilirsin. :smile:')
        }
    } //CodeMareFi - CMF / MareFi |\_/|

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Not-al','NOT-AL','not-AL','NOT-al'],
    permLevel: 0
}

exports.help = {
    name: 'not-al'
}