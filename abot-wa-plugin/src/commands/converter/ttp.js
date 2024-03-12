let { getBuffer } = require("../../lib/lib.function");

let handler = async (m, { conn, text }) => {
  if (!text) throw "Textnya mana?";
  let bytol = await getBuffer(
    `https://api.lolhuman.xyz/api/ttp?apikey=SGWN&text=${encodeURIComponent(
      text
    )}`
  );
  await m.reply(`Stiker sedang di buat . . .`);
  conn.sendStimg(m.chat, bytol, m, { packname: packname, author: author });
};

handler.command = /^(ttp)$/i;
handler.tags = ["converter"];
handler.limit = true;
handler.help = ["ttp"];

module.exports = handler;

//wm K1mimaru
