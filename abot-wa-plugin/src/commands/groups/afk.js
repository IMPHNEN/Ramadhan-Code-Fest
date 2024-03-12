let handler = async (m, { conn, usedPrefix, text }) => {
  let user = global.db.data.users[m.sender];
  user.afk = +new Date();
  user.afkReason = text;
  conn.reply(
    m.chat,
    `
  ${conn.getName(m.sender)} sekarang AFK${text ? ": " + text : ""}
  `,
    m
  );
};
handler.help = ["afk"];
handler.tags = ["groups"];
handler.command = /^afk$/i;

module.exports = handler;
