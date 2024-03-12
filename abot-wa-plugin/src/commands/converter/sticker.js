let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";
    if (!mime)
      throw `balas gambar/stiker/video dengan perintah ${usedPrefix + command}`;
    if (/webp/.test(mime)) {
      let img = await q.download();
      if (!img) throw `balas stiker dengan perintah ${usedPrefix + command}`;
      conn.sendStimg(m.chat, img, m, {
        packname: global.packname,
        author: global.author,
      });
    } else if (/image/.test(mime)) {
      let img = await q.download();
      if (!img) throw `balas gambar dengan perintah ${usedPrefix + command}`;
      conn.sendStimg(m.chat, img, m, {
        packname: global.packname,
        author: global.author,
      });
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) throw "Maksimal 10 detik!";
      let img = await q.download();
      if (!img) throw `balas video dengan perintah ${usedPrefix + command}`;
      conn.sendStvid(m.chat, img, m, {
        packname: global.packname,
        author: global.author,
      });
    }
  } catch (e) {
    throw e;
  }
};
handler.help = ["sticker"];
handler.tags = ["converter"];
handler.command = /^(s|sticker|stiker|sgif)$/i;

module.exports = handler;
