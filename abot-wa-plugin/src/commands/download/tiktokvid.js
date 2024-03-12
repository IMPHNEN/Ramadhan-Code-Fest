let handler = async (m, { conn, usedPrefix, command, args, text }) => {
  if (!text.includes("tiktok.com")) throw "Masukkan link tiktoknya";
  let json = await api.tiktok(`${args[0]}`);
  if (!json.id) return conn.reply(m.chat, "Vidio tidak ditemukan", m);
  await m.reply(wait);
  let caption = `乂  *T I K T O K*\n\n`;
  caption += `	◦  *Author* : ${json?.author?.name}\n`;
  caption += `	◦  *Tittle* : ${json?.title}\n`;
  caption += `	◦  *Watched* : ${json?.stats?.playCount}\n`;
  caption += `	◦  *Comments* : ${json?.stats?.commentCount}\n\n`;
  caption += global.footer;
  conn.sendFile(m.chat, json.video.noWatermark, "", caption, m);
};
handler.help = ["tiktoknowm"];
handler.tags = ["downloader"];
handler.limit = true;
handler.command = /^(tiktoknowm|tiktok|tt)$/i;

module.exports = handler;
