let levelling = require("../lib/lib.levelling");
let fs = require("fs");
let path = require("path");
let fetch = require("node-fetch");
let moment = require("moment-timezone");
let totalf = Object.values(global.plugins).filter(
  (v) => v.help && v.tags
).length;
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let { exp, limit, premium, premiumTime, money, level, role, registered } =
    global.db.data.users[m.sender];

  let name = registered
    ? global.db.data.users[m.sender].name
    : conn.getName(m.sender);

  const defaultMenu = {
    before: `
   ${global.ucapan}, ${name}

Bila ingin sewa bot atau membeli premium silahkan hubungi owner.
━━━━━━━━━━━━━━━━━━━
LIMIT   : ${premium ? `Infinity` : `${limit}`}
PREMIUM : ${
      premium ? `${conn.msToDate(premiumTime - new Date() * 1)}` : "Gratisan"
    }
ROLE    : *%role*
LEVEL   : *%level*
MONEY   : *%money*
━━━━━━━━━━━━━━━━━━━
UPTIME            : *%uptime*
USER TERDAFTAR    : *%rtotalreg user*
USER BELUM DAFTAR : *%totalreg user*
MODE              : *${global.opts["self"] ? "Self" : "Publik"}*
DATABASE          : *LOCALDB*
  `,
    header: "╭──✎『 %category 』",
    body: "│✎ %cmd",
    footer: "╰─────────❍",
    after: ``,
  };
  let tags = {
    downloader: "DOWNLOADER",
    database: "DATABASE",
    information: "INFORMASI",
    owner: "OWNER",
    converter: "CONVERTER",
    admins: "ADMIN TOOLS",
    group: "GROUP",
    tools: "TOOLS",
    special: "SPECIAL",
    relationship: "RELATIONSHIP",
    anonymous: "ANONYMOUS",
    userinfo: "USER",
    rpg: "RPG",
    game: "GAME",
  };

  try {
    let package = JSON.parse(
      await fs.promises
        .readFile(path.join(__dirname, "../package.json"))
        .catch((_) => "{}")
    );
    let { exp, limit, age, money, level, role, registered } =
      global.db.data.users[m.sender];
    let { min, xp, max } = levelling.xpRange(level, global.multiplier);
    let umur = `*${age == "-1" ? "Belum Daftar*" : age + "* Thn"}`;
    let name = registered
      ? global.db.data.users[m.sender].name
      : conn.getName(m.sender);
    let d = new Date(new Date() + 3600000);
    let locale = "id";
    let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor(d / 84600000) % 5
    ];
    let week = d.toLocaleDateString(locale, { weekday: "long" });
    let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
    let time = d.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    let _uptime = process.uptime() * 1000;
    let _muptime;
    if (process.send) {
      process.send("uptime");
      _muptime =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let muptime = clockString(_muptime);
    let uptime = clockString(_uptime);
    global.jam = time;
    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(
      (user) => user.registered == true
    ).length;
    let help = Object.values(global.plugins)
      .filter((plugin) => !plugin.disabled)
      .map((plugin) => {
        return {
          help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: "customPrefix" in plugin,
          limit: plugin.limit,
          premium: plugin.premium,
          enabled: !plugin.disabled,
        };
      });
    let groups = {};
    for (let tag in tags) {
      groups[tag] = [];
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin);
    }
    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after =
      conn.menu.after ||
      (conn.user.jid == global.conn.user.jid
        ? ""
        : `Dipersembahkan oleh https://wa.me/${
            global.conn.user.jid.split`@`[0]
          }`) + defaultMenu.after;
    let _text = [
      before,
      ...Object.keys(tags).map((tag) => {
        return (
          header.replace(/%category/g, tags[tag]) +
          "\n" +
          [
            ...help
              .filter(
                (menu) => menu.tags && menu.tags.includes(tag) && menu.help
              )
              .map((menu) => {
                return menu.help
                  .map((help) => {
                    return body
                      .replace(/%cmd/g, menu.prefix ? help : "%p" + help)
                      .replace(/%islimit/g, menu.limit ? "*(Limit)*" : "")
                      .replace(/%isPremium/g, menu.premium ? "*(Premium)*" : "")
                      .trim();
                  })
                  .join("\n");
              }),
            footer,
          ].join("\n")
        );
      }),
      after,
    ].join("\n");
    text =
      typeof conn.menu == "string"
        ? conn.menu
        : typeof conn.menu == "object"
        ? _text
        : "";
    let replace = {
      "%": "%",
      ucapan: global.ucapan,
      p: _p,
      uptime,
      muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup:
        max - exp <= 0
          ? `Siap untuk *${_p}levelup*`
          : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage
        ? package.homepage.url || package.homepage
        : "[unknown github url]",
      level,
      limit,
      name,
      umur,
      money,
      age,
      weton,
      week,
      date,
      dateIslamic,
      time,
      totalreg,
      rtotalreg,
      totalf,
      role,
      readmore: readMore,
    };
    text = text.replace(
      new RegExp(
        `%(${Object.keys(replace).sort((a, b) => b.length - a.length)
          .join`|`})`,
        "g"
      ),
      (_, name) => "" + replace[name]
    );

    let menu = text.trim();
    conn.sendMessageModify(m.chat, Func.Styles(menu), m, {
      ads: false,
      largeThumb: true,
      url: "https://chat.whatsapp.com/LMSaRzwUmYFAMDLV6mQnv7",
    });
  } catch (e) {
    conn.reply(m.chat, "Maaf, menu sedang error", m);
    throw e;
  }
};
handler.help = ["menu", "help", "?"];
handler.tags = ["special"];
handler.command = /^(m(enu)?|help|\?)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;
handler.exp = 3;

module.exports = handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
