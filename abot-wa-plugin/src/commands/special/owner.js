async function handler(m) {
  conn.sendContact(m.chat, `+62 812 6915 328`, `Ahlul`, m);
}
handler.help = ["owner", "creator"];
handler.tags = ["special"];

handler.command = /^(owner|creator)$/i;

module.exports = handler;
