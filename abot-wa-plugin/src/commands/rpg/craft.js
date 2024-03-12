let handler = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  try {
    let user = global.db.data.users[m.sender];
    let kayu = user.kayu * 1;
    let batu = user.batu * 1;
    let string = user.string * 1;
    let money = user.money * 1;
    let iron = user.iron * 1;
    let type = (args[0] || "").toLowerCase();
    let prefix = usedPrefix;

    let lmao1 = `Gunakan Format *${usedPrefix}${command} [type]*
contoh *${usedPrefix}${command} fishingRod*

*📌List yang Bisa Di Craft*
🎣FishingRod
⛏️Pickaxe
⚔️Sword
`.trim();

    switch (type) {
      case "fishingrod":
        if (user.fishingrod * 1 > 0) {
          let lmao = `anda sudah memiliki 🎣Fishing Rod
untuk mengupgrade ketik *${usedPrefix}upgrade fishingrod*`.trim();
          return conn.reply(m.chat, lmao, m);
        }

        if (kayu < 30 || string < 20 || money < 10000)
          return m.reply(
            `Material kamu kurang!!${
              kayu < 30 ? `\n🪵Kayu Kamu Kurang *${30 - kayu}*` : ""
            }${string < 20 ? `\n🕸️String Kamu Kurang *${20 - string}*` : ""}${
              user.money < 10000
                ? `\n💵Uang Kamu Kurang *${10000 - money}*`
                : ""
            }`
          );
        user.fishingrod += 1;
        user.kayu -= 30;
        user.batu -= 20;
        user.money -= 10000;
        user.fishingroddurability += 50;
        m.reply("Succes mengcrafting 🎣FishingRod");
        break;
      case "pickaxe":
        if (user.pickaxe * 1 > 0) {
          let lmao = `anda sudah memiliki ⛏️Pickaxe
untuk mengupgrade ketik *${usedPrefix}upgrade Pickaxe*`;
          return conn.reply(m.chat, lmao, m);
        }
        if (batu < 30 || kayu < 20 || money < 1500)
          return m.reply(`
Material Anda Kurang!!
${batu < 30 ? `\n🪨Batu kamu kurang *${30 - batu}*` : ""}${
            kayu < 20 ? `\n🪵Kayu kamu kurang *${20 - kayu}*` : ""
          }${money < 15000 ? `\n💵Uang kamu kurang *${15000 - money}*` : ""}`);
        user.pickaxe += 1;
        user.kayu -= 20;
        user.batu -= 30;
        user.money -= 15000;
        user.pickaxedurability += 50;
        m.reply("Succes mengcrafting ⛏️Pickaxe");
        break;
      case "sword":
        if (user.sword * 1 > 0) {
          let lmao = `Anda sudah memiliki ⚔️Sword, untuk mengupgrade ketik
*${usedPrefix}upgrade sword*`;
          return conn.reply(m.chat, lmao, m);
        }
        if (iron < 30 || kayu < 20 || money < 10000)
          return m.reply(`
Material Anda Kurang!!
${iron < 30 ? `\n⛓️Iron kamu kurang *${30 - iron}*` : ""}${
            kayu < 20 ? `\n🪵Kayu kamu kurang *${20 - kayu}*` : ""
          }${money < 10000 ? `\n💵Uang kamu kurang *${10000 - money}*` : ""}`);
        user.sword += 1;
        user.iron -= 30;
        user.kayu -= 20;
        user.money -= 10000;
        user.sworddurability += 50;
        m.reply("Succes mengcrafting ⚔️Sword");
        break;
      default:
        return conn.reply(m.chat, lmao1, m);
    }
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, "Error!!", m);
    if (DevMode) {
      let file = require.resolve(__filename);
      for (let jid of global.owner
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .filter((v) => v != conn.user.jid)) {
        conn.sendMessage(
          jid,
          file +
            " error\nNo: *" +
            m.sender.split`@`[0] +
            "*\nCommand: *" +
            m.text +
            "*\n\n*" +
            e +
            "*"
        );
      }
    }
  }
};
handler.help = ["craft"];
handler.tags = ["rpg"];
handler.command = /^(craft(ing)?)$/i;
handler.group = true;
handler.fail = null;

module.exports = handler;
