let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (/image/.test(mime)) {
    var media = await q.download();
    var { img } = await conn.generateProfilePicture(media);
    await conn.query({
      tag: "iq",
      attrs: { to: m.chat, type: "set", xmlns: "w:profile:picture" },
      content: [{ tag: "picture", attrs: { type: "image" }, content: img }],
    });
    m.reply(`Success`);
  } else {
    throw `Reply image`;
  }
};
handler.tags = ["admins"];
handler.help = ["setppgcfull"];
handler.owner = true;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
handler.command = /^(setppgcfull)$/i;
module.exports = handler;
