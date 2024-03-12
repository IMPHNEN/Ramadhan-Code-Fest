let handler = async (m, { conn, args }) => {
  if (!args || !args[0]) return conn.reply(m.chat, "Uhm... urlnya mana?", m);
  if (
    !/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(
      args[0]
    )
  )
    return conn.reply(m.chat, "Youtube only bosku", m);
  const json = await Func.fetchJson(
    "https://yt.nxr.my.id/yt2?url=" + args[0] + "&type=audio"
  );
  if (!json.status || !json.data.url) return conn.reply(m.chat, eror, m);
  await m.reply(wait);
  let caption = `乂  *YT AUDIO*\n\n`;
  caption += `	◦  *Title* : ${json.title}\n`;
  caption += `	◦  *Size* : ${json.data.size}\n`;
  caption += `	◦  *Duration* : ${json.duration}\n`;
  caption += `	◦  *Bitrate* : ${json.data.quality}\n\n`;
  caption += global.footer;
  conn
    .sendMessageModify(m.chat, caption, m, {
      largeThumb: true,
      thumbnail: await Func.fetchBuffer(json.thumbnail),
    })
    .then(async () => {
      conn.sendFile(m.chat, json.data.url, json.data.filename, "", m, {
        document: true,
      });
    });
};
handler.help = ["ytmp3"];
handler.tags = ["downloader"];
handler.command = /^yt(a(udio)?|mp3|musik|lagu)$/i;
handler.exp = 3;
handler.limit = true;
module.exports = handler;
