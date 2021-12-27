const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs"); //Ccd Code
const moment = require("moment");
const Jimp = require("jimp");
const ayarlar = require("./ayarlar.json");
require("./util/eventLoader")(client);
const db = require("quick.db"); //Ccd Code
const express = require("express");
const app = express(); //Ccd Code x Fade Code
const http = require("http");
app.get("/", (request, response) => {
  console.log(`...`); //Ccd Code
  console.error("---");

  response.sendStatus(200); //Ccd Code x Fade Code
});
app.listen(process.env.PORT);
setInterval(() => {
  //Ccd Code
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); //Ccd Code x Fade Code
}, 280000);

let prefix = ayarlar.prefix;

console.log("Başarı ile bağlantı kurdum ve aktifim... Ccd Code <3"); //Ccd Code
console.log("Ccd Code <3");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`); //Ccd Code
};

client.commands = new Discord.Collection(); //Ccd Code
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek. Ccd Code!.`); //Ccd Code
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props); //Ccd Code
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name); //Ccd Code x Fade Code
    });
  });
}); //Ccd Code

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      //Ccd Code
      delete require.cache[require.resolve(`./komutlar/${command}`)]; //Ccd Code x Fade Code
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        //Ccd Code
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name); //Ccd Code
      });
      resolve();
    } catch (e) {
      reject(e); //Ccd Code
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`); //Ccd Code
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name); //Ccd Code
      }); //Ccd Code
      resolve();
    } catch (e) {
      reject(e); //Ccd Code
    }
  });
}; //Ccd Code

client.unload = command => {
  //Ccd Code
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)]; //Ccd Code
      let cmd = require(`./komutlar/${command}`); //Ccd Code x Fade Code
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias); //Ccd Code
      });
      resolve();
    } catch (e) {
      //Ccd Code
      reject(e);
    }
  });
}; //Ccd Code

client.elevation = message => {
  //Ccd Code
  if (!message.guild) return message.author.send("**Beni Sunucuda Deneyin**"); //Ccd Code
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2; //Ccd Code
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4; //Ccd Code
  return permlvl; //Ccd Code
}; //Ccd Code x Fade Code

client.login(ayarlar.token); //Ccd Code

client.on("ready", async () => {
  let sesliKanalID = client.channels.cache.get("924009233840742460");
  if (sesliKanalID)
    sesliKanalID
      .join()
      .catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});



client.on('message', msg => {
if (msg.content === 'sa') {
msg.reply('As Kardeşim Hoş Geldin.');
}
});

 client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel.send(`${msg.member}, Capslock Kapat Knk.`).then(nordx => nordx.delete({timeout: 5000}))
              
          }
        }
      }
    }
  }
})
client.on("guildMemberAdd", async member => {
 let log = 'mod-log';
let lbulundu = await db.fetch(`giriscikis_${member.guild.id}`);
if (lbulundu === null) log = 'mod-log';
else log = lbulundu;
        
  
      
const channel = member.guild.channels.find('name', `${log}`);
  
  if (!channel) return;
        let username = member.user.username;
        let id = member.user.id;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
          const bg = await Jimp.read("https://cdn.discordapp.com/attachments/499911418896973824/500023171827761154/guildAdd_2.png");
  const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    if( id == "900372939436879902" ){
                     channel.send(new Discord.Attachment("./img/" + member.id + ".png"))
                      channel.send("İşte Bak! Kurucum sunucuna giriş yaptı.")
                    }else{
                     channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
                    }
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })




client.on('message', message => {

  // Datadaki "Küfür Engel" Kısmını Çağıralım
  let codemarefiküfürengel = db.fetch(`codemarefiküfürengel_${message.guild.id}`)

  // Komutlarımıza Geçelim, Eğer Küfür Engel Sistemi Aktif İse Küfür Yazan Kullanıcıya Uyarı Verelim
  if(codemarefiküfürengel === 'aktif'){
    // Küfür Ayarlamaları
    const codemarefiküfürliste = ['AMK','Amk','amk','Amına koyayım','AMINA KOYAYIM','amına koyayım','aq','sg','oç','Oç','Sg','Aq','Aw','Sikerim','sikerim','SİKERİM','Amına sokarım','AMINA SOKARIM','amına sokarım','götünü sikerim','Götünü Sikerim','GÖTÜNÜ SİKERİM','Götünü Sikerim']
    if(codemarefiküfürliste.some(codemarefi => message.content.includes(codemarefi))){
      // Kullanıcının Mesajını Silelim
      message.delete();

      // Küfür eden terbiyesize uyarı mesajı atalım ve bu 5 saniye sonra chati kirletmemek açısından silinsin.
      const keslanterbiyesizherif = new Discord.MessageEmbed()
      .setDescription(`${message.author} - **Küfür etme knk**`) 
      .setColor('#36393F')
      message.channel.send(keslanterbiyesizherif).then(codemarefisil => {
        codemarefisil.delete({timeout: 5000})
      })
    }
  } else {
    return
  }
})          

client.on('message', message => {

  // Datadaki "Reklam Engel" Kısmını Çağıralım
  let codemarefireklamengel = db.fetch(`linkcodemarefi_${message.guild.id}`)

  // Komutlarımıza Geçelim, Eğer Reklam Engel Sistemi Aktif İse Reklam Yapan Kullanıcıya Uyarı Verelim
  if(codemarefireklamengel === 'codemarefiaktif'){
    // Reklam Ayarlamaları
    const codemarefireklamliste = ['.org','.tr','.space','.funy','.fun','.com','.xyz','.glitch-me','.eueo.org','free.biz','.biz','.free','.blogspot-com','.alan','.com.tr','.sexs','.hub','.dance','.in','.net','.shop','.store','.click','.tech','.best','.college','.me','.site','.online','.art','.host','.baby','.website','.blog','.link','.top','.info','.press','.monster','.services']
    if(codemarefireklamliste.some(codemarefi => message.content.includes(codemarefi))){
      // Kullanıcının Mesajını Silelim
      message.delete();

      // Reklam yapan terbiyesize uyarı mesajı atalım ve bu 5 saniye sonra chati kirletmemek açısından silinsin.
      const reklamyasak = new Discord.MessageEmbed()
      .setDescription(`${message.author} - **Hey Dostum!. Bu Sunucuda Reklam Yapmana İzin Vermem.**`) 
      .setColor('#36393F')
      message.channel.send(reklamyasak).then(codemarefisil => {
        codemarefisil.delete({timeout: 5000})
      })
    }
  } else {
    return
  }
})          
client.on('channelDelete', (channel) => {
    if(db.has(`kanalk_${channel.guild.id}`) === false) return;
    let kategoriID = channel.parentID;
    channel.clone({ name: channel.name, reason: 'izinsiz silindi.' }).then(channels => {
    let ganal = channel.guild.channels.cache.find("kanal-güncelleme", channel.name)
    channels.setParent(channel.guild.channels.cache.find(channelss => channelss.id === kategoriID));
    channels.send(`Bu kanal silindi ve kanal koruma sistemi sayesinde başarıyla tekrardan açıldı!\nKanalın adı, kanalın konusu, kanalın kategorisi, kanalın izinleri başarıyla ayarlandı.`);                     
  });
});

client.on("roleDelete", async(role , channel , message , guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions})
        role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum  :white_check_mark::`)


}
})
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply("**Aleyküm Selam Hoşgeldin.**");
    }
  }
});


client.on("messageDelete", async message => {
  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(
    await db.fetch(`log_${message.guild.id}`)
  );

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "");

  log.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

    .addField("**Eylem:**", "Mesaj Düzenleme")

    .addField(
      "**Mesajın sahibi:**",
      `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`
    )

    .addField("**Eski Mesajı:**", `${oldMessage.content}`)

    .addField("**Yeni Mesajı:**", `${newMessage.content}`)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`,
      oldMessage.guild.iconURL()
    )

    .setThumbnail(oldMessage.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelCreate", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());

  let kanal;

  if (channel.type === "text") kanal = `<#${channel.id}>`;

  if (channel.type === "voice") kanal = `\`${channel.name}\``;

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal:**", `${kanal}`)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconUR);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelDelete", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal:**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleCreate", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Rol Oluşturma")

    .addField("**Rolü Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan Rol:**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor("#ff0000")

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleDelete", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Rol Silme")

    .addField("**Rolü Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Rol:**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor("#ff0000")

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiCreate", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Oluşturma")

    .addField("**Emojiyi Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan Emoji:**", `${emoji} - İsmi: \`${emoji.name}\``)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiDelete", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Silme")

    .addField("**Emojiyi Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Emoji:**", `${emoji}`)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setColor("#ff0000")

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

  if (!modlog) return;

  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Güncelleme")

    .addField("**Emojiyi Güncelleyen Kişi:**", `<@${entry.executor.id}>`)

    .addField(
      "**Güncellenmeden Önceki Emoji:**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )

    .addField(
      "**Güncellendikten Sonraki Emoji:**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL
    )

    .setThumbnail(oldEmoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Yasaklama")

    .addField("**Kullanıcıyı Yasaklayan Yetkili:**", `<@${entry.executor.id}>`)

    .addField("**Yasaklanan Kullanıcı:**", `**${user.tag}** - ${user.id}`)

    .addField("**Yasaklanma Sebebi:**", `${entry.reason}`)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Yasak Kaldırma")

    .addField("**Yasağı Kaldıran Yetkili:**", `<@${entry.executor.id}>`)

    .addField(
      "**Yasağı Kaldırılan Kullanıcı:**",
      `**${user.tag}** - ${user.id}`
    )

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildMemberAdd", async member => {
  const e = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage("https://cdn.discordapp.com/attachments/924009234411184207/924369323798167632/axysyapt.gif")
    .setFooter("Bu Sunucu 7/24 Korunuyor:).")
    .addField("Arkdaşlarını buradan  davet edebilirsin","https://discord.gg/G23JvNGE8t")
    .setDescription(`**Sunucumuza Hoş Geldin Rolün tadını çıkar iyi roller.**`)
    .setTitle(`**Prox Roleplay**`)
  member.send(e);
});



  let mese = require("parse-ms");
moment.locale("tr");
client.on("guildMemberAdd", async member => {
  let rol = member.guild.roles.cache.find(r => r.name === "fake");
  let kanal = member.guild.channels.cache.get("924396203209293835");

  let kanalcik = client.channels.cache.get(kanal);
  let tarih = moment(member.user.createdAt).format("DD MM YYYY");
  let geçen = mese(Date.now() - member.user.createdTimestamp);
  let saniye = geçen.seconds;
  let dakika = geçen.minutes;
  let saat = geçen.hours;
  let gün = geçen.days;
  let nekdr = saniye + " Saniye";
  if (gün > 0)
    nekdr =
      gün +
      " Gün " +
      saat +
      " Saat " +
      dakika +
      " Dakika " +
      saniye +
      " Saniye";
  else if (saat > 0)//by: Ege'#0001
    nekdr = saat + " Saat " + dakika + " Dakika " + saniye + " Saniye";
  else if (dakika > 0) nekdr = dakika + " Dakika " + saniye + " Saniye";
  const user = client.users.cache.get(member.id);
  const kurulus = new Date().getTime() - user.createdAt.getTime();

  if (kurulus < 2592000000) {
    await member.roles.add(rol);

    const embed1 = new Discord.MessageEmbed()
      .setTitle("⏰ BİLDİRİ ⏰")
      .setColor("RED")
      .setTimestamp()
      .setDescription(
        `<@${member.id}> İsimli Kullanıcı Hesap Aktifikasyonu Sebebiyle Cezalandırıldı!\n\`Hesap Kuruluş Tarihi:\` **${tarih}**\n\`Aktifikasyon Süresi:\` **${nekdr}**`
      );
    kanal.send(embed1);//discord.gg/turkiye

    const embed = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor("RED")
      .setTitle(`⚠ UYARI ⚠️`)
      .setDescription(
        `__**🔎 Merhaba Hesabınız 30 Günden Önce Oluşturulduğu için Sunucuya Erişiminiz Engellendi!**__\n \n**▫️Hesabınızın Oluşturulduğu Zaman: \`${nekdr}\`**`
      )
      .setFooter(`${member.guild.name}`);
    await member.send(embed);
  }
});

client.on('guildMemberAdd', async member => {
  let cdb = require("croxydb")
  let hgbb = cdb.get(`cshgbb.${member.guild.id}`)
  let sunucu =  member.guild.channels.cache.get(hgbb)
if(hgbb){
if(sunucu){
  const embed = new Discord.MessageEmbed()
  .setColor('RED')
  .setAuthor(member.user.tag, member.user.avatarURL())
  .setThumbnail(member.user.avatarURL())
  .setDescription(`${member} Sunucucuya Katıldı Toplam Üye: \`${member.guild.memberCount}\``)
  .setFooter(member + `Sunucuya Katıldı!`)
  sunucu.send(embed) //dctr ekibi
}}
})

client.on('guildMemberRemove', async member => {
let cdb = require("croxydb")
  let hgbb = cdb.get(`cshgbb.${member.guild.id}`)
  let sunucu =  member.guild.channels.cache.get(hgbb)
if(hgbb){
if(sunucu){
  const embed = new Discord.MessageEmbed() //dctr ekibi
  .setColor('RED')
  .setAuthor(member.user.tag, member.user.avatarURL())
  .setThumbnail(member.user.avatarURL())
  .setDescription(`${member.user.tag} Sunucudan Ayrıldı! Geriye Kalan Üye: ${member.guild.memberCount}`)
  .setFooter(member.user.tag + `Sunucudan Ayrıldı!`)
  sunucu.send(embed)//by: Ege#0003
}}
})

;


client.on('guildMemberAdd', async member  => {
  if(member.guild.id!="924009233350008863") return false;
 let member2 = member.user 
 let zaman = new Date().getTime() - member2.createdAt.getTime()
 var user = member2 
 var ardademrzaman = [];
 if(zaman < 172800000) {
 ardademrzaman = `Hesap Yeni Açılmış`
 } else {
 ardademrzaman = `Hesap Yeni Açılmamış`}require("moment-duration-format");
   let zaman1 = new Date().getTime() - user.createdAt.getTime()
   const gecen = moment.duration(zaman1).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    const ardademrembed = new Discord.MessageEmbed()
    .setColor('#efff00')
     .setDescription(`**Hoş Geldin:** ${member}\n**Discord'a Kayıt Olma Süresi:** ${gecen}\n**Hesap Yeni Mi?:** ${ardademrzaman}`)
 client.channels.cache.get('924708501173989386').send(ardademrembed)
   
           });