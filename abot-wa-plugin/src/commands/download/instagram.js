let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `!Input URL`;
  try {
    let old = new Date();
    let json = await api.ig(args[0]);
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
  } catch (e) {
    throw `Gagal Download `;
  }
};
handler.help = ["igdl"];
handler.tags = ["downloader"];
handler.command = /^(instagram|ig(dl)?)$/i;
handler.exp = 3;
handler.limit = true;
module.exports = handler;
