let handler = async (m, { command, usedPrefix, text }) => {
  let M = m.constructor;
  let which = command.replace(/add/i, "");
  if (!m.quoted) throw "*Reply to something and add a text*!";
  if (!text) throw `Use *${usedPrefix}list${which}* see the list `;
  let msgs = global.db.data.msgs;
  if (text in msgs) throw `'${text}' registered in the message list`;
  msgs[text] = M.toObject(await m.getQuotedObj());
  m.reply(`*✳️ Message successfully added to the message list as '${text}'*
    
*access with ${usedPrefix}get${which} ${text}*`);
};
handler.help = ["vn", "msg", "video", "audio", "img", "sticker"].map(
  (v) => "add" + v
);
handler.tags = ["database"];
handler.command = /^add(vn|msg|video|audio|img|sticker)$/;
handler.rowner = true;

module.exports = handler;
