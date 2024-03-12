let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let _md = `${Math.floor(Math.random() * 3500)}`.trim();
  let md = _md * 1;
  let __timers = new Date() - user.lastmining;
  let _timers = 60000 - __timers;
  let timers = clockString(_timers);
  if (new Date() - user.lastmining > 60000) {
    conn.reply(m.chat, `Anda mendapatkan *Rp.${md}* Money`, m);
    global.db.data.users[m.sender].money += md * 1;
    global.db.data.users[m.sender].lastmining = new Date() * 1;
  } else {
    let text = `silahkan tunggu *${timers}* lagi untuk bisa mengclaim lagi`;
    conn.reply(m.chat, text, m);
  }
};
handler.help = ["mining"];
handler.tags = ["rpg"];
handler.command = /^(mining)$/i;
handler.group = true;

handler.fail = null;

module.exports = handler;

function clockString(ms) {
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, m, s });
  return [m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
