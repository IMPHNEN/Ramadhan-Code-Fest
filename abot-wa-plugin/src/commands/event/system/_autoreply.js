let fs = require("fs");
let moment = require("moment-timezone");

let handler = (m) => m;

handler.all = async function (m) {
  if (m.chat.endsWith("status@broadcast")) {
    console.log("sw cok");
  }
  let { isBanned } = db.data.chats[m.chat];
  let { banned } = db.data.users[m.sender];
  let { group } = db.data.settings[this.user.jid];
  let setting = db.data.settings[this.user.jid];
  let user = global.db.data.users[m.sender];

  // salam
  let reg = /(ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم)/i;
  let isSalam = reg.exec(m.text);
  if (isSalam && !m.fromMe) {
    m.reply(
      `وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ\n_wa\'alaikumussalam wr.wb._`
    );
  }

  // ketika ada yang invite/kirim link grup di chat pribadi
  if (
    (m.mtype === "groupInviteMessage" ||
      m.text.startsWith("https://chat") ||
      m.text.startsWith("Buka tautan ini")) &&
    !m.isBaileys &&
    !m.isGroup
  ) {
    this.reply(
      m.chat,
      `┌「 *Undang Bot ke Grup* 」
├ 7 Hari / Rp 5,000
├ 30 Hari / Rp 15,000
└────
`.trim(),
      m
    );
  }

  if (/^bot$/i.test(m.text)) {
    await this.reply(m.chat, `Bot aktif >//<`, m);
  }

  // backup db
  if (setting.backup) {
    if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
      let d = new Date();
      let date = d.toLocaleDateString("id", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      await global.db.write();
      this.reply(
        global.owner[0] + "@s.whatsapp.net",
        `Database: ${date}`,
        null
      );
      let data = fs.readFileSync("./database.json");
      await this.sendMessage(
        owner[0] + "@s.whatsapp.net",
        {
          document: data,
          mimetype: "application/json",
          fileName: "database.json",
        },
        { quoted: null }
      );
      setting.backupDB = new Date() * 1;
    }
  }

  return !0;
};

module.exports = handler;
