let handler = async (m, { text, conn, usedPrefix, args, command }) => {
  try {
    if (!text) return m.reply(`Contoh:\n${usedPrefix}${command} sigli`);
    let json = await api.getCuaca(text);
    if (json.cod != 200) return conn.reply(m.chat, Func.jsonFormat(json), m);
    let caption = `*CUACA HARI INI*\n\n`;
    caption += `◦ *Lokasi* : ${json.name}\n`;
    caption += `◦ *Negara* : ${json.sys.country}\n`;
    caption += `◦ *Cuaca* : ${json.weather[0].description}\n`;
    caption += `◦ *Kecepatan Angin* : ${json.wind.speed} Km/Jam\n`;
    caption += `◦ *Kelembapan* : ${json.main.humidity} %\n`;
    caption += `◦ *Suhu Saat Ini* : ${json.main.temp} °C\n`;
    caption += `◦ *Suhu Tertinggi* : ${json.main.temp_max} °C\n`;
    caption += `◦ *Suhu Terendah* :  ${json.main.temp_min} °C\n\n`;
    caption += global.footer;
    conn.sendMessageModify(m.chat, caption, m, {
      ads: false,
      largeThumb: true,
      thumbnail: await Func.fetchBuffer(
        "https://telegra.ph/file/5e1afb4b2f039cb2cb61a.jpg"
      ),
    });
  } catch (err) {
    console.log(err);
    m.reply("Maaf, sepertinya ada yang error :" + err);
  }
};

handler.help = ["cuaca"];
handler.tags = ["information"];
handler.command = /^(cuaca)$/i;

module.exports = handler;
