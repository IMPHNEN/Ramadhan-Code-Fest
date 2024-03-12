let handler = (m) => m;

handler.before = function (m) {
  if (!global.db.data.settings.auto) return;
  //if (m.isBaileys && m.fromMe) return true
  if (
    (m.mtype === "groupInviteMessage" ||
      m.text.startsWith("https://chat") ||
      m.text.startsWith("Buka tautan ini")) &&
    !m.isBaileys
  ) {
    m.copyNForward("628126915328@s.whatsapp.net", true);
  }
};

module.exports = handler;
