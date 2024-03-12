let translate = require("@vitalets/google-translate-api");

let handler = async (m, { args, usedPrefix, command }) => {
  let lang, text;
  if (args.length >= 2) {
    (lang = args[0] ? args[0] : "id"), (text = args.slice(1).join(" "));
  } else if (m.quoted && m.quoted.text) {
    (lang = args[0] ? args[0] : "id"), (text = m.quoted.text);
  } else throw `Ex: ${usedPrefix + command} id hello world`;
  let res = await translate(text, { to: lang, autoCorrect: true }).catch(
    (_) => null
  );
  if (!res) throw `Error: The language "${lang}" is not supported`;
  m.reply(`${res.text}`.trim());
};
handler.help = ["translate"];
handler.tags = ["tools"];
handler.command = /^(t((erjemahkan|ransl(ate|et))|(erjemah|r))|apanih)$/i;

module.exports = handler;
