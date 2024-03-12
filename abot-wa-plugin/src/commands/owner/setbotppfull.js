let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `Namanya apa?`;
  let bot = conn.user.jid; // Bot
  try {
    await conn.query({
      tag: "iq",
      attrs: { to: bot, type: "set", xmlns: "w:profile:name" },
      content: [{ tag: "name", attrs: { type: "text" }, content: text }],
    });
    m.reply(`Success`);
  } catch (e) {
    throw e;
  }
};
handler.tags = ["owner"];
handler.help = ["setname"];
handler.rowner = true;
handler.command = /^(setname)$/i;
module.exports = handler;
