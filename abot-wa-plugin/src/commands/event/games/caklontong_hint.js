let handler = async (m, { conn }) => {
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (!(id in conn.caklontong)) throw `Soal itu telah berakhir`;
  let json = conn.caklontong[id][1];
  let ans = json.jawaban;
  let clue = ans.replace(/[AIUEOaiueo]/g, "_");
  m.reply("```" + clue + "```");
};
handler.command = /^calo$/i;
handler.limit = true;
handler.group = true;
module.exports = handler;
