let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let __timers = new Date() - user.lastclaim2;
  let _timers = 86400000 - __timers;
  let timers = clockString(_timers);
  if (new Date() - user.lastclaim2 > 86400000) {
    conn.reply(
      m.chat,
      `Anda sudah mengklaim dan mendapatkan 300 XP, 1000 💵money dan 1 potion`,
      m
    );
    global.db.data.users[m.sender].money += 1000;
    global.db.data.users[m.sender].potion += 1;
    global.db.data.users[m.sender].exp += 300;
    global.db.data.users[m.sender].lastclaim2 = new Date() * 1;
  } else {
    let text = `silahkan tunggu *🕒${timers}* lagi untuk bisa mengclaim lagi\n`;
    conn.reply(m.chat, text, m);
  }
};
handler.help = ["claim"];
handler.tags = ["rpg"];
handler.command = /^(claim|daily|harian)2$/i;
handler.group = true;
handler.fail = null;
handler.money = 0;

module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
