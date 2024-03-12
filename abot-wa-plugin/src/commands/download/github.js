let fetch = require("node-fetch");
let handler = async (m, { conn, args }) => {
  try {
    let regex = /(?:https?|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    if (!args[0]) return m.reply("Ex: https://github.com/ahlulmukh/nilou-bot");
    if (!regex.test(args[0])) return m.reply("Invalid URL");
    let [, user, repo] = args[0].match(regex) || [];
    repo = repo.replace(/.git$/, "");
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
    let res = await fetch(url, { method: "head" });
    if (res.status !== 200) return m.reply(res.statusText);
    let fileName = res.headers
      .get("content-disposition")
      .match(/attachment; filename=(.*)/)[1];
    let mimetype = res.headers.get("content-type");
    await m.reply(wait);
    conn.sendMessage(
      m.chat,
      { document: { url }, fileName, mimetype },
      { quoted: m }
    );
  } catch (e) {
    m.reply(`Url github tidak di temukan`);
  }
};
handler.help = ["gitclone"];
handler.tags = ["downloader"];
handler.command = /^(gitclone)$/;
handler.exp = 3;
handler.limit = true;
module.exports = handler;
