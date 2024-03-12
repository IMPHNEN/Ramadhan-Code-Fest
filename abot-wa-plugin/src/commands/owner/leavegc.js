let handler = async (m, { conn, usedPrefix, command }) => {
  await conn.groupLeave(m.chat);
};
handler.help = ["leavegc"];
handler.tags = ["group", "owner"];
handler.rowner = true;
handler.command = /^(leavegc)$/i;
handler.group = true;

module.exports = handler;
