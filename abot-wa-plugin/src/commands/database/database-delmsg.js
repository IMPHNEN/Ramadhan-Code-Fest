let handler = async (m, { command, usedPrefix, text }) => {
  let which = command.replace(/del/i, "");
  if (!text) throw `Use *${usedPrefix}list${which}* to see the list`;
  let msgs = global.db.data.msgs;
  if (!text in msgs) throw `'${text}' not registered in the message list`;
  delete msgs[text];
  m.reply(
    `Eliminate the message with success in the list of messages with the name '${text}'`
  );
};
handler.help = ["vn", "msg", "video", "audio", "img", "sticker"].map(
  (v) => "del" + v
);
handler.tags = ["database"];
handler.command = /^del(vn|msg|video|audio|img|sticker)$/;
handler.rowner = true;

module.exports = handler;
