const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {


  const davet = new Discord.MessageEmbed()
  .addField('Botun Davet Linki','[Botu Davet Etmek İçin Tıkla](https://discord.com/oauth2/authorize?client_id=924368931211317269&scope=bot&permissions=27648860222)')
message.channel.send(davet)

};

exports.conf = {
  aliases: ['avnbot'],
  permLevel: 0,
  kategori: "Komutlar",
};

exports.help = {
  name: 'davet',
  description: 'AvnBOTu sunucunuza davet etmek için bir link atar.',


};