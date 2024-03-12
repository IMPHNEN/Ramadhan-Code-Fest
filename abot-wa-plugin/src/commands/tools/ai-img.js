let handler = async (m, { text, conn, usedPrefix, args, command }) => {
  try {
    if (!text)
      return m.reply(
        `Membuat gambar dari AI.\n\nContoh:\n${usedPrefix}${command} Wooden house on snow mountain`
      );
    let result = await api.dalle(text);
    conn.sendFile(m.chat, result, "", text, m);
  } catch (err) {
    console.log(err);
    m.reply("Maaf, sepertinya ada yang error :" + err);
  }
};

handler.help = ["ai-img"];
handler.tags = ["tools"];
handler.command = /^(ai-img)$/i;

module.exports = handler;
