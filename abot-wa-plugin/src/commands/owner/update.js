const { execSync } = require("child_process");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  var stdout = execSync("git pull");
  var output = stdout.toString();
  if (output.match(new RegExp("Already up to date", "g")))
    return conn.reply(m.chat, `🚩 ${output.trim()}`, m);
  if (output.match(/stash/g)) {
    var stdout = execSync("git stash && git pull");
    var output = stdout.toString();
    conn.reply(m.chat, `🚩 ${output.trim()}`, m).then(async () => {
      process.send("reset");
    });
  } else
    return conn.reply(m.chat, `🚩 ${output.trim()}`, m).then(async () => {
      process.send("reset");
    });
};
handler.help = ["update"];
handler.tags = ["owner"];
handler.command = /^(update|up)$/i;

handler.rowner = true;

module.exports = handler;
