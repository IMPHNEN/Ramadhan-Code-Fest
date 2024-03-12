let handler = function (m) {
  if (!m.quoted) throw `Reply pesan bot!`;
  let { chat, fromMe, id, isBaileys } = m.quoted;
  if (!isBaileys) throw "Pesan tersebut bukan dikirim oleh bot!";
  conn.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: true,
      id: m.quoted.id,
      participant: m.quoted.sender,
    },
  });
};
handler.help = ["delete"];
handler.tags = ["special"];
handler.command = /^(d|del|delete|unsend?)$/i;
handler.limit = false;

module.exports = handler;
