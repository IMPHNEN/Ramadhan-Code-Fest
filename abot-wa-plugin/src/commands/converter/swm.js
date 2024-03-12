let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  let respond = `Ex: ${usedPrefix + command} Sticker By|Abot`;
  let packnyae = text.split("|")[0];
  let authnye = text.split("|")[1];
  if (!packnyae) throw respond;
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";
    if (/webp/.test(mime)) {
      let img = await q.download();
      if (!img) throw `balas stiker dengan perintah ${usedPrefix + command}`;
      conn.sendStimg(m.chat, img, m, { packname: packnyae, author: authnye });
    } else if (/image/.test(mime)) {
      let img = await q.download();
      if (!img) throw `balas gambar dengan perintah ${usedPrefix + command}`;
      conn.sendStimg(m.chat, img, m, { packname: packnyae, author: authnye });
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) throw "Maksimal 10 detik!";
      let img = await q.download();
      if (!img) throw `balas video dengan perintah ${usedPrefix + command}`;
      conn.sendStvid(m.chat, img, m, { packname: packnyae, author: authnye });
    }
  } catch (e) {
    throw e;
  }
};
handler.help = ["stickerwm"];
handler.tags = ["converter"];
handler.command = /^(swm|stikerwm|wm|stickerwm)$/i;
handler.limit = true;

module.exports = handler;
