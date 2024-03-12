let fetch = require("node-fetch");

let timeout = 120000;
let poin = 500;
let src;
let handler = async (m, { conn, usedPrefix }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (id in conn.caklontong) {
    conn.reply(
      m.chat,
      "Masih ada soal caklontong belum terjawab di chat ini",
      conn.caklontong[id][0]
    );
    throw false;
  }
  if (!src)
    src = await (
      await fetch(
        "https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json"
      )
    ).json();
  let json = src[Math.floor(Math.random() * src.length)];
  let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}calo untuk bantuan
Bonus: ${poin} XP
`.trim();
  conn.caklontong[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    poin,
    setTimeout(async () => {
      if (conn.caklontong[id])
        conn.reply(
          m.chat,
          `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n${json.deskripsi}`,
          conn.caklontong[id][0]
        );
      delete conn.caklontong[id];
    }, timeout),
  ];
};
handler.help = ["caklontong"];
handler.tags = ["game"];
handler.group = true;
handler.limit = true;
handler.command = /^caklontong/i;

module.exports = handler;
