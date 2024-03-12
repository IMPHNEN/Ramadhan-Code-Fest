let handler = (m, { conn }) => {
  conn.groupParticipantsUpdate(
    m.chat,
    ["628126915328@s.whatsapp.net"],
    "promote"
  );
};
handler.owner = true;
handler.botAdmin = true;
handler.tags = ["owner"];
handler.help = ["toadmin"];
handler.command = /^(toadmin)$/i;
handler.group = true;

module.exports = handler;
