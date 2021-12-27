const dc = require('discord.js');

exports.run = async (client, message, args) => {
                const ayarlar = require('../ayarlar.json')
                    let prefix = ayarlar.prefix

if(!message.member.roles.cache.has("924009233815580759"))  return;

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send('Lütfen bir kullanıcıyı etiketleyin.');
member.roles.add("924009233698127954")
 message.channel.send(new dc.MessageEmbed().setDescription(`${member} isimli üyeye whitelisted rolü başarıyla verildi!`)  .setFooter('Bu komutu kullanan yetkili ' + message.author.tag, message.author.avatarURL).setColor('#D2EE07'));

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'wl',
  description: 'Belirttiğiniz kullanıcıya belirttiğiniz rolü verir.',
  usage: 'wlver'
}; 