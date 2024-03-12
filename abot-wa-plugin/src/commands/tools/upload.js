const uploadFile = require("../../lib/uploadFile");
const uploadImage = require("../../lib/uploadImage");

let handler = async (m, { conn, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime)
    throw `Kirim foto/video yang ingin diubah ke url dengan caption *${usedPrefix}${command}* atau reply medianya`;
  let media = await q.download();
  let isTele = /image\/(png|jpe?g|gif|webp)|video\/mp4/.test(mime);
  let link = await (isTele ? uploadImage : uploadFile)(media);
  await m.reply(wait);
  m.reply(`${link}`);
};
handler.help = ["tourl"];
handler.tags = ["tools"];
handler.command = /^(upload|to(url|link))$/i;

module.exports = handler;
