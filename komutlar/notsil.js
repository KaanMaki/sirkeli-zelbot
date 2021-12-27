const Discord = require('discord.js')
const db = require('quick.db')

    exports.run = (client, message, args) => {
        // Hata
        if(!args[0]){
            const kadirfi = new Discord.MessageEmbed()
            .setDescription(`**Lütfen Komutu Doğru Kullanın**
                \n Doğru Kullanım;\n \`.not-sil 1\`\n \`.not-sil 2\`\n \`.not-sil 3\`
            `)
            .setColor('#ff0000')
            return message.channel.send(kadirfi)
        }

        // Coded By KadirFi & MareFi
        if(args[0] === "1"){
            db.delete(`codemarefinot1_${message.author.id}`)
            message.channel.send('1. Notunuz Datadan Silindi')
        }

        if(args[0] === "2"){
            db.delete(`codemarefinot2_${message.author.id}`)
            message.channel.send('2. Notunuz Datadan Silindi')
        }

        if(args[0] === "3"){
            db.delete(`codemarefinot3_${message.author.id}`)
            message.channel.send('3. Notunuz Datadan Silindi')
        }

        if(args[0] > 4){
            message.reply('En fazla 3 not silebilirsin. :smile:')
        }
    } //CodeMareFi - CMF / MareFi |\_/|

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Not-sil','NOT-SİL','not-SİL','NOT-sil'],
    permLevel: 0
}

exports.help = {
    name: 'not-sil'
}