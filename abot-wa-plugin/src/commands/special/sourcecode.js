let handler = async (m, { conn }) => {
  let txt = `Create By Ahlul Mukhramin \n\nNilou Bot : https://github.com/ahlulmukh/nilou-bot\nChatGPT Telegram : https://github.com/ahlulmukh/chatgpt-telegram`;
  conn.reply(m.chat, txt, m);
};
handler.help = ["sourcecode"];
handler.tags = ["special"];
handler.command = /^(sc(ript(bot)?)?|sourcecode)$/i;

module.exports = handler;
