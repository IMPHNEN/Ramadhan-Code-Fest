let handler = async (m, { conn, command, usedPrefix, text }) => {
  let which = command.replace(/get/i, "");
  if (!text) throw `✳️ Use *${usedPrefix}list${which}* to see the list`;
  let msgs = global.db.data.msgs;
  if (!text in msgs) throw `*'❗${text}' not registered in the message list*`;
  let _m = await conn.serializeM(msgs[text]);
  await _m.copyNForward(m.chat, true);
};
handler.help = ["vn", "msg", "video", "audio", "img", "sticker"].map(
  (v) => "get" + v
);
handler.tags = ["database"];
handler.command = /^get(vn|msg|video|audio|img|sticker)$/;
handler.rowner = true;

module.exports = handler;
