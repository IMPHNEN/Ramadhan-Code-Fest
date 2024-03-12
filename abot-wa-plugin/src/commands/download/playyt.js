const { error } = require("qrcode-terminal");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `Mau nyari lagu apa?\nExample: ${usedPrefix + command} mantra hujan`;
  let json = await scrap.ytPlay(text);
  if (!json.id) return client.reply(m.chat, error, m);
  await m.reply(wait);
  let caption = `乂  *YT PLAY*\n\n`;
  caption += "	◦  *Title* : " + json.title + "\n";
  caption += "	◦  *Link* : " + json.url + "\n";
  caption += "	◦  *Size* : " + json.size_mp3 + "\n\n";
  caption += global.footer;
  conn
    .sendMessageModify(m.chat, caption, m, {
      largeThumb: true,
      thumbnail: await Func.fetchBuffer(json.thumb),
    })
    .then(async () => {
      conn.sendFile(m.chat, json.link, "", "", m, true, {
        mimetype: "audio/mp4",
      });
    });
};

handler.command = /^(play)$/i;
handler.tags = ["downloader"];
handler.help = ["play"];
handler.limit = true;
handler.fail = null;
module.exports = handler;
