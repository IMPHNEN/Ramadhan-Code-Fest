let handler = async (m, { conn, usedPrefix, command, args, text }) => {
  if (!text.includes("tiktok.com")) throw "Masukkan link tiktoknya";
  let json = await api.tiktok(`${args[0]}`);
  if (!json.id) return conn.reply(m.chat, "Vidio tidak ditemukan", m);
  await m.reply(wait);
  conn.sendMessage(
    m.chat,
    {
      audio: { url: json?.music?.play_url },
      mimetype: "audio/mpeg",
      fileName: `${command}.mp3`,
    },
    { quoted: m }
  );
};
handler.command =
  /^(ttmp3|tiktokmp3|tiktokaudio|ttaudio|tiktokmusic|tiktokmusik)$/i;
handler.help = ["tiktokmusic"];
handler.tags = ["downloader"];
handler.limit = true;
module.exports = handler;
