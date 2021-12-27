const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = async role => {
  const kanal = role.guild.channels.get("924396203209293835").id;
  if (!kanal) return;
  const guild = role.guild;
  const audit = await guild.fetchAuditLogs({ limit: 1 });
    const entry = await audit.entries.first();
let bot = '[Bot]';
    if (!entry.executor.bot) bot = '';
  const embed = await new Discord.RichEmbed()
        .setTitle('**Role Deleted**')
        .addField('Role', `@${role.name}\n\`${role.id}\``, true)
        .addField('Deleted by', `\`\`${entry.executor.tag} ${bot}\`\`\n\`${entry.executor.id}\``, true)
        .setFooter('Time of Action')
        .setTimestamp(Date.now())
        .setColor("RANDOM");
 let log = role.guild.channels.find( channel => channel.name === "mod-log");
 log.send("<@"+entry.executor.id+"> isimli kullanici bir rolü sildi ve yetkilerini aldim.")
role.guild.members.get(entry.executor.id).roles.forEach(r => {
role.guild.members.get(entry.executor.id).removeRole(r)
console.log("rolleralindi")

})
};