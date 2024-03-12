let handler = async (m, { conn, usedPrefix, command }) => {
  conn.bomb = conn.bomb ? conn.bomb : {};
  let id = m.chat,
    timeout = 180000;
  if (id in conn.bomb)
    return conn.reply(m.chat, "*^ sesi ini belum selesai!*", conn.bomb[id][0]);
  const bom = ["💥", "✅", "✅", "✅", "✅", "✅", "✅", "✅", "✅"].sort(
    () => Math.random() - 0.5
  );
  const number = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
  const array = [];
  bom.map((v, i) =>
    array.push({
      emot: v,
      number: number[i],
      position: i + 1,
      state: false,
    })
  );
  let teks = `❏  *B O M B*\n\n`;
  teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
  teks +=
    array
      .slice(0, 3)
      .map((v) => (v.state ? v.emot : v.number))
      .join("") + "\n";
  teks +=
    array
      .slice(3, 6)
      .map((v) => (v.state ? v.emot : v.number))
      .join("") + "\n";
  teks +=
    array
      .slice(6)
      .map((v) => (v.state ? v.emot : v.number))
      .join("") + "\n\n";
  teks += `Timeout : [ *${timeout / 1000 / 60} menit* ]\n`;
  teks += ` `;
  conn.bomb[id] = [
    await conn.reply(m.chat, teks, m),
    array,
    setTimeout(() => {
      let v = array.find((v) => v.emot == "💥");
      if (conn.bomb[id])
        conn.reply(
          m.chat,
          `*Waktu habis!*, Bom berada di kotak nomor ${v.number}.`,
          conn.bomb[id][0]
        );
      delete conn.bomb[id];
    }, timeout),
  ];
};
handler.help = ["tebakbom"];
handler.tags = ["game"];
handler.limit = true;
handler.command = /^(tebakbom|bomb)$/i;

module.exports = handler;
