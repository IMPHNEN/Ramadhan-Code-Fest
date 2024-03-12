let handler = async (m, { conn, args }) => {
  let old = new Date();
  if (!args[0]) throw "Masukan urlnya";
  let json = await api.fbdl(args[0]);
  if (!json.status) return conn.reply(m.chat, eror, m);
  await m.reply(wait);
  json.result.map(async (v) => {
    conn.sendFile(
      m.chat,
      v,
      "",
      `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
      m
    );
    await conn.delay(1500);
  });
};

handler.help = ["facebook"];
handler.tags = ["downloader"];
handler.alias = ["fb", "fbdl", "facebook", "facebookdl"];
handler.command = /^((facebook|fb)(dl)?)$/i;
handler.exp = 3;
handler.limit = true;
module.exports = handler;
