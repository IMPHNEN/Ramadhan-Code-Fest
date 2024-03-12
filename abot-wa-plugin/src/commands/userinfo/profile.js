let PhoneNumber = require("awesome-phonenumber");
let moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta"); // Change this to your local timezone
moment.locale("id"); // Change this to your locale
let handler = async (m, { conn, text }) => {
  let number = isNaN(text)
    ? text.startsWith("+")
      ? text.replace(/[()+\s-]/g, "")
      : text.split`@`[1]
    : text;
  if (!text && !m.quoted)
    return conn.reply(m.chat, `🚩 Mention or Reply chat target.`, m);
  if (isNaN(number)) return conn.reply(m.chat, `🚩 Invalid number.`, m);
  if (number.length > 15) return conn.reply(m.chat, `🚩 Invalid format.`, m);
  let pic = await Func.fetchBuffer("./media/image/default.jpg");
  try {
    if (text) {
      var user = number + "@s.whatsapp.net";
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + "@s.whatsapp.net";
    }
  } catch (e) {
  } finally {
    let target = global.db.data.users[user];
    if (typeof target == "undefined")
      return client.reply(m.chat, `🚩 Can't find user data.`, m);
    try {
      pic = await Func.fetchBuffer(await conn.profilePictureUrl(user, "image"));
    } catch (e) {
    } finally {
      let {
        name,
        premium,
        premiumTime,
        atm,
        limit,
        warning,
        pasangan,
        money,
        exp,
        lastclaim,
        registered,
        regTime,
        age,
        level,
        role,
      } = global.db.data.users[user];
      let username = conn.getName(user);
      let jodoh = `Berhubungan dengan @${pasangan.split("@")[0]}`;
      let str = `
  ╭───ꕥ *PROFILE* ꕥ───✾
  │•> Name: ${username} | ${name}
  │•> Status: ${pasangan ? jodoh : "Jomblo"}
  │•> Premium: ${
    premium ? `${conn.msToDate(premiumTime - new Date() * 1)}` : "Gratisan"
  }
  │•> Number: ${PhoneNumber(
    "+" + user.replace("@s.whatsapp.net", "")
  ).getNumber("international")}
  │•> Umur: *${age == "-1" ? "Belum Daftar" : age}*
  │•> Link: wa.me/${user.split`@`[0]}
  │•> Level: *${level}*
  │•> Rank : *${role}*
  │•> Limit: *${limit}*
  │•> Registered: ${
    registered
      ? "Yes (" +
        moment(new Date(regTime)).format("dddd, Do MMMM YYYY, hh:mm") +
        ")"
      : "No"
  }
  │•> Atm: *${atm}*
  │•> Money: *${money}*
  │•> Exp  : *${exp}*
  │•> Warning : *${warning}*
  ╰─────────────────────
  `.trim();
      conn.sendMessageModify(m.chat, str, m, {
        largeThumb: true,
        thumbnail: pic,
      });
    }
  }
};
handler.help = ["profile"];
handler.tags = ["userinfo"];
handler.command = /^(profile)$/i;
handler.register = false;
module.exports = handler;
