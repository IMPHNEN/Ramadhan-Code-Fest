let handler = async (m, { text, conn, usedPrefix, args, command }) => {
  try {
    let json = await api.infoGempa();
    if (!json.status) return conn.reply(m.chat, Func.jsonFormat(json), m);
    let caption = `*‼ Hati-hati terhadap gempabumi susulan yang mungkin terjadi*\n\n`;
    caption += `◦ *📅Tanggal* : ${json.result.waktu}\n`;
    caption += `◦ *📌Koordinat* : ${json.result.koordinat}\n`;
    caption += `◦ *🌋Magnitudo* : ${json.result.magnitude}\n`;
    caption += `◦ *🌊Kedalaman* : ${json.result.kedalaman}\n`;
    caption += `◦ *📍Area* : ${json.result.lokasi}\n`;
    caption += `◦ *📈Dirasakan* : ${json.result.potensi}\n\n`;
    caption += global.footer;

    conn.sendMessageModify(m.chat, caption, m, {
      largeThumb: true,
      thumbnail: await Func.fetchBuffer(json.result.map),
    });
  } catch (err) {
    console.log(err);
    m.reply("Maaf, sepertinya ada yang error");
  }
};

handler.help = ["gempa"];
handler.tags = ["information"];
handler.command = /^(gempa)$/i;

module.exports = handler;
