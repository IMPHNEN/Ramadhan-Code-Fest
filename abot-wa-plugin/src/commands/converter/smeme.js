let uploadFile = require("../../lib/uploadFile");
let uploadImage = require("../../lib/uploadImage");
let { webp2png } = require("../../lib/lib.webp2mp4");
let { Sticker, StickerTypes } = require("wa-sticker-formatter");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  bawah = text.split("|")[0] ? text.split("|")[0] : "-";
  atas = text.split("|")[1] ? text.split("|")[1] : "-";
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime)
    throw `balas gambar/stiker dengan perintah\n\n${usedPrefix + command} <${
      atas ? atas : "teks bawah"
    }>|<${bawah ? bawah : "teks atas"}>`;
  let img = await q.download();
  let stek = new Sticker(img, {
    pack: packname,
    author: author,
    type: StickerTypes.FULL,
  });
  let out;
  await m.reply("Sticker sedang di buat . . .");
  try {
    if (/webp/g.test(mime)) out = await webp2png(img);
    else if (/image/g.test(mime)) out = await uploadImage(img);
    else if (/video/g.test(mime)) out = await uploadFile(img);
    else if (/viewOnce/g.test(mime)) out = await uploadFile(img);
    if (typeof out !== "string") out = await uploadImage(img);
    else if (/gif/g.test(mime)) out = stek;
  } catch (e) {
    console.error(e);
  } finally {
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(
      bawah ? bawah : "-"
    )}/${encodeURIComponent(atas ? atas : "-")}.png?background=${out}`;
    conn.sendStimg(m.chat, meme, m, { packname: packname, author: author });
  }
};

handler.help = ["smeme"];
handler.tags = ["converter"];
handler.command = /^s(ti(ck(er)?|ker)meme|m(eme|i?m))$/i;

module.exports = handler;
