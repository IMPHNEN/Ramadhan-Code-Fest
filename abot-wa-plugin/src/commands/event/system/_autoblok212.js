let handler = (m) => m;
handler.before = async function (m, { conn }) {
  if (m.sender.startsWith("212")) {
    return conn.updateBlockStatus(m.sender, "block");
  }
};

module.exports = handler;
