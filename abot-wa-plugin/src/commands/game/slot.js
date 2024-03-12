let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  if (user.money == 0) return conn.reply(m.chat, `Duit kamu ga cukup`, m);
  if (user.money < 1000)
    return conn.reply(
      m.chat,
      `Untuk bermain minimal kamu harus mempunyai 1000 point.`,
      m
    );
  let reward = 0;
  let emojis = ["🍃", "🍟", "🐱"];
  let a = Math.floor(Math.random() * emojis.length);
  let b = Math.floor(Math.random() * emojis.length);
  let c = Math.floor(Math.random() * emojis.length);
  let x = [],
    y = [],
    z = [];
  for (let i = 0; i < 3; i++) {
    x[i] = emojis[a];
    a++;
    if (a == emojis.length) a = 0;
  }
  for (let i = 0; i < 3; i++) {
    y[i] = emojis[b];
    b++;
    if (b == emojis.length) b = 0;
  }
  for (let i = 0; i < 3; i++) {
    z[i] = emojis[c];
    c++;
    if (c == emojis.length) c = 0;
  }
  let end;
  // 5% chance of winning
  let randomNum = Math.random();
  if (randomNum < 0.05) {
    reward = Func.randomInt(global.min_reward, global.max_reward);
    end = `JACKPOT! *+${Func.formatNumber(reward)} Money*`;
    user.money += reward;
  } else {
    reward = Func.randomInt(global.min_reward, global.max_reward);
    end = `LOSE! *-${Func.formatNumber(reward)} Money*`;
    if (reward > user.point) {
      user.money = 0;
    } else {
      user.money -= reward;
    }
  }
  let teks = `乂  *S L O T S*\n\n`;
  teks += `	[ ${x[0]} ${y[0]} ${z[0]} ]\n`;
  teks += `	[ ${x[1]} ${y[1]} ${z[1]} ]\n`;
  teks += `	[ ${x[2]} ${y[2]} ${z[2]} ]\n`;
  teks += `\n${end}`;
  conn.reply(m.chat, teks, m);
};

handler.help = ["slot", "jackpot"];
handler.tags = ["game"];
handler.group = true;
handler.limit = true;
handler.command = /^slots?|jac?kpot$/i;
module.exports = handler;
