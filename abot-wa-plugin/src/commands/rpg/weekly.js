let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  let _md = `${Math.floor(Math.random() * 20000)}`.trim();
  let md = _md * 1;
  let _lg = `${Math.floor(Math.random() * 4)}`.trim();
  let lg = _lg * 1;
  let _timers = 604800000 - (new Date() - user.lastweekly);
  let timers = clockString(_timers);
  if (new Date() - user.lastweekly > 604800000) {
    conn.reply(
      m.chat,
      `selamat anda mendapatkan *Rp.${md} ${rpg.emoticon(
        "money"
      )}money dan ${lg} ${rpg.emoticon("legendary")}Legendary crate*`,
      m
    );
    user.money += md * 1;
    user.legendary += lg * 1;
    user.lastweekly = new Date() * 1;
  } else {
    let text = `silahkan tunggu *🕒${timers}* lagi untuk bisa mengclaim lagi`;
    conn.reply(m.chat, text, m);
  }
};
handler.help = ["weekly"];
handler.tags = ["rpg"];
handler.command = /^(weekly|mingguan)$/i;
handler.level = 5;
handler.group = true;
handler.fail = null;

module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
