let handler = async (m, { conn, args }) => {
  if (!args || !args[0]) return conn.reply(m.chat, "Uhm... urlnya mana?", m);
  if (
    !/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(
      args[0]
    )
  )
    return conn.reply(m.chat, "youtube only", m);
  const json = await api.ytVideo(args[0]);
  if (!json.status) return conn.reply(m.chat, eror, m);
  await m.reply(wait);
  let caption = `乂  *YT VIDEO*\n\n`;
  caption += `	◦  *Title* : ${json.result.title}\n`;
  caption += `	◦  *Channel* : ${json.result.uploader}\n`;
  caption += `	◦  *Duration* : ${json.result.duration}\n`;
  caption += `	◦  *Size* : ${json.result.link.size}\n`;
  caption += `	◦  *views* : ${json.result.view}\n\n`;
  caption += global.footer;
  conn
    .sendMessageModify(m.chat, caption, m, {
      largeThumb: true,
      thumbnail: await Func.fetchBuffer(json.result.thumbnail),
    })
    .then(async () => {
      conn.sendFile(m.chat, json.result.link.link, "", "", m);
    });
};
handler.help = ["ytmp4"];
handler.tags = ["downloader"];
handler.command = /^yt(v(idi?e?o)?|mp4)?$/i;
handler.exp = 3;
handler.limit = true;
module.exports = handler;
