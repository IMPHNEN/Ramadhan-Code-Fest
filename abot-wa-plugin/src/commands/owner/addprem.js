let handler = async (m, { conn, text, usedPrefix, command }) => {
  let input = text.trim().split(" ");
  let number = input[0];
  let txt = input[1];
  if (!text && !m.quoted)
    return conn.reply(m.chat, `Mention or reply target`, m);
  if (isNaN(number)) return client.reply(m.chat, `Nomor Salah Kok`, m);
  if (number.length > 15)
    return conn.reply(m.chat, `Masa iya nomor terlalu panjang`, m);
  try {
    if (text) {
      var user = number + "@s.whatsapp.net";
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + "@s.whatsapp.net";
    }
  } catch (e) {
  } finally {
    let data = global.db.data.users[user];
    if (typeof data == "undefined")
      return conn.reply(m.chat, `Nomor tidak terdaftar didatabase`, m);
    var jumlahHari = 86400000 * parseInt(txt);
    var now = new Date() * 1;
    if (now < data.premiumTime) data.premiumTime += jumlahHari;
    else data.premiumTime = now + jumlahHari;
    data.premium = true;
    m.reply(
      `Berhasil!\n*@${user.replace(
        /@.+/,
        ""
      )}* sekarang sudah premium ${txt} hari.\n\ncountdown: ${conn.msToDate(
        data.premiumTime - now
      )}`
    );
  }
};

handler.help = ["addprem"];
handler.tags = ["owner"];
handler.command = /^(add|tambah|\+)p(rem)?$/i;
handler.rowner = true;
module.exports = handler;
