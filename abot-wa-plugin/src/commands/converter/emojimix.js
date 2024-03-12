let fetch = require("node-fetch");
let handler = async (m, { conn, text }) => {
  try {
    let emo = text.split("+");
    if (!emo[0])
      return conn.reply(m.chat, "Emojinya?\nContoh: .emojimix 😪+😴", m);
    if (!emo[1]) return conn.reply(m.chat, "Contoh:\n!emojimix 😪+😴", m);
    let res = await (
      await fetch(
        `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
          emo[0]
        )}_${encodeURIComponent(emo[1])}`
      )
    ).json();
    conn.sendStimg(m.chat, res.results[0].url, m, {
      packname: "Emojimix",
      author: wm,
    });
  } catch (e) {
    console.log(e);
    conn.reply(
      m.chat,
      "Emoji tidak support!!\nSilakan ganti salah satu emoji!",
      m
    );
  }
};
handler.help = ["emojimix", "semix"];
handler.tags = ["converter"];
handler.command = /^(emojimix|semix)$/i;

module.exports = handler;
