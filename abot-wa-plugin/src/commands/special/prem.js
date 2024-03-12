let handler = async (m, { conn, usedPrefix }) => {
  let text = `Berikut adalah list harga sewa dan premium bot\n`;
  text += `Sewa bot 7 Hari 10k\n`;
  text += `Sewa bot 30 Hari 20k\n`;
  text += `Premium 7 Hari 5k\n`;
  text += `Premium 30 Hari 10k\n\n`;
  text += `Apa keuntungan sewa bot? terdapat fitur rpg dan game yang dapat digunakan member group\n`;
  text += `Apa keuntungan premium? mendapatkan limit infinty dan dapat menggunakan fiture premium\n`;
  text += `Untuk pembayaran bisa ke \n• Dana: 08126915328\n• Gopay: 08126915328\n• Pulsa: 08126915328\n`;
  text += `Jika sudah ditransfer jangan lupa kirim bukti pembayaran ke owner`;
  m.reply(text);
};
handler.help = ["sewa", "premium"];
handler.tags = ["special"];
handler.command = /^(sewa|premium)$/i;

module.exports = handler;
