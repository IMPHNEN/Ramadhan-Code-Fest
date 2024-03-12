let handler = async (m, { isOwner, isAdmin, conn, text, participants }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail("admin", m, conn);
    throw false;
  }
  let teks = `${text ? text : ""}\n\n「 Tag All 」\n`;
  for (let mem of participants) {
    teks += `• @${mem.id.split("@")[0]}\n`;
  }
  teks += `\n`;
  conn.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map((a) => a.id),
  });
};
handler.help = ["tagall"];
handler.tags = ["admins"];
handler.command = /^(t(agall)?)$/i;
handler.group = true;
handler.admin = true;

module.exports = handler;
