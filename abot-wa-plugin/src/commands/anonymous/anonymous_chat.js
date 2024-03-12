let fetch = require("node-fetch");
async function handler(m, { command, usedPrefix }) {
  if (!global.db.data.settings[this.user.jid].anon)
    throw `Fitur ini tidak aktif`;
  command = command.toLowerCase();
  this.anonymous = this.anonymous ? this.anonymous : {};
  switch (command) {
    //case 'next':
    //case 'skip':
    case "leave": {
      let room = Object.values(this.anonymous).find((room) =>
        room.check(m.sender)
      );
      if (!room) {
        await this.reply(
          m.chat,
          `_Kamu tidak sedang berada di anonymous chat_\n\nMau cari partner chating?\nGunakan perintah ${usedPrefix}start`,
          m
        );
        throw false;
      }
      this.reply(
        m.chat,
        `_Kamu meninggalkan room anonymous chat_\n\nMau main anonymous lagi?\nYa ketikan ${usedPrefix}start\n`,
        m
      );
      let other = room.other(m.sender);
      if (other)
        await this.reply(
          other,
          `_Partner meninggalkan chat_\n\nMau cari patner chat lagi?\nGunakan perintah ${usedPrefix}start`,
          m
        );
      delete this.anonymous[room.id];
      if (command === "leave") break;
    }
    case "start": {
      if (Object.values(this.anonymous).find((room) => room.check(m.sender))) {
        await this.reply(
          m.chat,
          `_Kamu masih berada di dalam anonymous chat_\n\nMau keluar?\nketikan perintah ${usedPrefix}leave`,
          m
        );
        throw false;
      }
      let room = Object.values(this.anonymous).find(
        (room) => room.state === "WAITING" && !room.check(m.sender)
      );
      if (room) {
        await this.reply(
          room.a,
          "_Partner ditemukan!_\nSilahkan chatingan🤗",
          m
        );
        room.b = m.sender;
        room.state = "CHATTING";
        await this.reply(
          room.a,
          "_Partner ditemukan!_\nSilahkan chatingan🤗",
          m
        );
      } else {
        let id = +new Date();
        this.anonymous[id] = {
          id,
          a: m.sender,
          b: "",
          state: "WAITING",
          check: function (who = "") {
            return [this.a, this.b].includes(who);
          },
          other: function (who = "") {
            return who === this.a ? this.b : who === this.b ? this.a : "";
          },
        };
        await this.reply(
          m.chat,
          `_Menunggu partner..._\n\nKalo bosan menunggu, ketikan perintah ! ${usedPrefix}leave`,
          m
        );
      }
      break;
    }
  }
}
handler.help = ["start", "leave"];
handler.tags = ["anonymous"];
handler.command = ["start", "leave"]; //, 'next', 'skip']

handler.private = true;

module.exports = handler;
