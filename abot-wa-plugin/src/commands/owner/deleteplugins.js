let handler = async (m, { usedPrefix, command, text }) => {
  let ar = Object.keys(plugins);
  let ar1 = ar.map((v) => v.replace(".js", ""));
  if (!text)
    throw `uhm.. teksnya mana?\n\ncontoh:\n${usedPrefix + command} menu`;
  if (!ar1.includes(text))
    return m.reply(
      `'${text}' tidak ditemukan!\n\n${ar1.map((v) => " " + v).join`\n`}`
    );
  m.reply(require("fs").unlinkSync("./plugins/" + text + ".js", "utf-8"));
};
handler.help = ["deleteplugins"];
handler.tags = ["owner"];
handler.command = /^(deleteplugins|delplugins)$/i;

handler.rowner = true;

module.exports = handler;
