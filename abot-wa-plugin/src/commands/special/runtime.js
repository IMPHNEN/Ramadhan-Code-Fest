let { getBuffer } = require("../../lib/lib.function");
let handler = async (m, { conn, usedPrefix, command }) => {
  let _uptime = process.uptime() * 1000;
  let uptimex = clockString(_uptime);
  conn.sendMessageModify(m.chat, `Aktif selama:\n*${uptimex}*`.trim(), m, {
    ads: false,
    largeThumb: true,
    title: `Runtime Simple WhatsApp Bot`,
    thumbnail: await getBuffer(global.yttajathumb),
  });
};
handler.help = ["runtime"];
handler.tags = ["special"];
handler.command = /^(uptime|runtime)$/i;

module.exports = handler;

function clockString(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000));
  let daysms = ms % (24 * 60 * 60 * 1000);
  let hours = Math.floor(daysms / (60 * 60 * 1000));
  let hoursms = ms % (60 * 60 * 1000);
  let minutes = Math.floor(hoursms / (60 * 1000));
  let minutesms = ms % (60 * 1000);
  let sec = Math.floor(minutesms / 1000);
  return (
    days + " Hari " + hours + " Jam " + minutes + " Menit " + sec + " Detik"
  );
}
