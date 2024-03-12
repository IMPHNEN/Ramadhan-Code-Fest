let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  let args1 = args[0];
  let args2 = args[1];
  if (isNaN(args2))
    return m.reply(
      `contoh:\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`
    );
  let who = m.mentionedJid
    ? m.mentionedJid[0]
    : args2.replace(/[@ .+-]/g, "").replace(" ", "") + "@s.whatsapp.net";
  if (!args1 || !args2) throw `Pke format ${usedPrefix + command} @tag jumlah`;
  if (global.db.data.users[m.sender].limit >= args2 * 1) {
    try {
      global.db.data.users[m.sender].limit -= args2 * 1;
      global.db.data.users[who].limit += args2 * 1;
      let guid = () => {
        let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        };
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4();
      };
      let text = `TRANSFER LIMIT
  
  ID: ${guid()}
  FROM: ${m.sender.split("@")[0]}
  TO: ${who.split("@")[0]}
  AMOUNT: ${args2}
  
  STATUS SUCCESS`;
      m.reply(text);
    } catch {
      throw `Transfer Gagal`;
    }
  } else {
    throw `Limit anda tidak mencukupi untuk mentransfer limit sebanyak ${args2}`;
  }
};

handler.help = ["tflimit"];
handler.tags = ["userinfo"];
handler.command = /^(tflimit)$/i;

module.exports = handler;
