let { groupsSettingUpdate } = require("@whiskeysockets/baileys");
let handler = async (
  m,
  { isAdmin, isOwner, isBotAdmin, conn, args, usedPrefix, command }
) => {
  if (!(isAdmin || isOwner)) {
    global.dfail("admin", m, conn);
    throw false;
  }
  if (!isBotAdmin) {
    global.dfail("botAdmin", m, conn);
    throw false;
  }
  let prefix = usedPrefix;
  let bu = `Group telah di buka oleh @${
    m.sender.split`@`[0]
  } dan sekarang  semua member dapat mengirim pesan

ketik *${usedPrefix}group buka*
Untuk membuka grup!`.trim();

  let isClose = {
    open: "not_announcement",
    buka: "not_announcement",
    on: "not_announcement",
    1: "not_announcement",
    close: "announcement",
    tutup: "announcement",
    off: "announcement",
    0: "announcement",
  }[args[0] || ""];
  if (isClose === undefined) {
    await conn.reply(
      m.chat,
      `
contoh:
${usedPrefix + command} tutup
${usedPrefix + command} buka 
	`.trim(),
      m
    );
    throw false;
  } else if (isClose === "announcement") {
    await conn.groupSettingUpdate(m.chat, isClose);
    let teks = `Group telah di tutup oleh @${
      m.sender.split`@`[0]
    } dan sekarang hanya admin yang dapat mengirim pesan

ketik *${usedPrefix}group buka*
Untuk membuka grup!`.trim();
    await conn.reply(m.chat, teks, m, {
      mentions: [m.sender],
    });
  } else if (isClose === "not_announcement") {
    await conn.groupSettingUpdate(m.chat, isClose);
    await conn.reply(m.chat, bu, m, {
      mentions: [m.sender],
    });
  } else if (isClose === undefined) {
    await conn.reply(
      m.chat,
      `
contoh:
${usedPrefix + command} tutup
${usedPrefix + command} buka
	`.trim(),
      m
    );
  }
};

handler.help = ["grup"];
handler.tags = ["admins"];
handler.command = /^(g(ro?up|c?)?)$/i;
handler.group = true;
handler.botAdmin = false;

module.exports = handler;
