let handler = async (m, { text, conn, usedPrefix, args, command }) => {
  try {
    if (!text)
      return m.reply(`Contoh : ${usedPrefix}${command} Ahlul Mukhramin`);
    let json = await scrap.mahaSiswa(text);
    if (!json.status) return conn.reply(m.chat, Func.jsonFormat(json), m);
    json.msg.map(async (v) => {
      let caption = `乂  *Data Mahasiswa*\n\n`;
      caption += `	◦  *Nama* : ${v.Nama}\n`;
      caption += `	◦  *Nim* : ${v.Nim}\n`;
      caption += `	◦  *Prodi* : ${v.Prodi}\n`;
      caption += `	◦  *Kampus* : ${v.Kampus}\n\n`;
      caption += global.footer;
      conn.reply(m.chat, caption, m);
      await conn.delay(1500);
    });
  } catch (err) {
    console.log(err);
    m.reply("Maaf, sepertinya ada yang error");
  }
};

handler.help = ["mahasiswa"];
handler.tags = ["information"];
handler.command = /^(mahasiswa)$/i;

module.exports = handler;
