let handler = async (m, { conn, args, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];
  if (!args || !args[0] || args[0].startsWith("0"))
    return conn.reply(
      m.chat,
      `🚩 Berikan argumen berupa nominal point untuk dispin.`,
      m
    );
  if (isNaN(args[0]))
    return conn.reply(m.chat, `${usedPrefix} ${command} 1000`, m);
  if (args[0] > user.money)
    return conn.reply(
      m.chat,
      `🚩 Pointmu tidak cukup untuk melakukan spin sebanyak ${Func.formatNumber(
        args[0]
      )} money.`,
      m
    );
  if (args[0] < 1000)
    return conn.reply(
      m.chat,
      `🚩 Tidak bisa melakukan spin dengan nominal dibawah 1000 money.`,
      m
    );

  user.money -= args[0];

  // 5% chance of winning
  let randomNum = Math.random();
  let reward = 0;
  if (randomNum < 0.05) {
    reward = Func.randomInt(100, args[0] * 3);
    user.money += reward;
  }

  let teks = `乂  *S P I N - R E S U L T*\n\n`;
  teks += `	*- ${Func.formatNumber(args[0])}*\n`;
  if (reward > 0) {
    teks += `	*+ ${Func.formatNumber(reward)}*\n\n`;
  } else {
    teks += `	*LOSE*\n\n`;
  }
  teks += `• *Total* : ${Func.formatNumber(user.money)} Money`;
  conn.reply(m.chat, teks, m);
};

handler.help = ["spin"];
handler.tags = ["game"];
handler.group = true;
handler.limit = true;
handler.command = /^(spin)$/i;
module.exports = handler;
