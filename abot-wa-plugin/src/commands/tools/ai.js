let handler = async (m, { text, conn, usedPrefix, args, command }) => {
  try {
    if (!text)
      return m.reply(
        `Chattingan dengan AI.\nTanyakan apa saja kepada ai dengan cara penggunaan \n\nContoh : ${usedPrefix}${command} tolong berikan motivasi cinta`
      );
    let json = await api.chatgptv3(text);
    let result = json.result;
    conn.reply(m.chat, result, m);
  } catch (err) {
    m.reply("Maaf, sepertinya ada yang error");
  }
};

handler.help = ["ai"];
handler.tags = ["tools"];
handler.limit = true;
handler.command = /^(ai)$/i;

module.exports = handler;
