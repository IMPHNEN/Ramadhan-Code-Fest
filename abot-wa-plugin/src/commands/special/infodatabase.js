let handler = async (m, { usedPrefix, command, conn, text }) => {
  let totalreg = Object.keys(global.db.data.users).length;
  let rtotalreg = Object.values(global.db.data.users).filter(
    (user) => user.registered == true
  ).length;
  let kon = `*Database saat ini ${totalreg} user*\n*Registrasi saat ini ${rtotalreg} user*`;
  await conn.reply(m.chat, kon, m);
};
handler.help = ["user"];
handler.tags = ["special"];
handler.command = /^(pengguna|(jumlah)?database|user)$/i;

module.exports = handler;
