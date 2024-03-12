let fs = require("fs");
let chalk = require("chalk");
global.owner = JSON.parse(fs.readFileSync("./src/json/owner.json"));

global.APIs = {
  xzn: "https://xzn.wtf/",
};
global.APIKeys = {
  "https://xzn.wtf/": "ahmuq",
};
// Put your number to folder /src/owner.json // Want some help?
global.api = new (require("./src/lib/lib.api"))();
global.Func = new (require("./src/lib/lib.function2"))();
global.scrap = new (require("./src/lib/lib.scraper"))();
global.wait = "*Sedang Di proses*";
global.eror = "*Maaf fitur sedang error,cobalah lain kali!*";

//========Url Template Buttons=========//
global.dtu = "ʀᴇsᴛ ᴀᴘɪ";
global.urlnya = "https://api.aldev.my.id/";

//============= callButtons =============//
global.dtc = "ᴄᴀʟʟ ᴏᴡɴᴇʀ";
global.phn = "+62 812-6915-328";
global.nomorown = "628126915328";

//============= Games ================//
global.benar = "*Benar✅*";
global.salah = "*Salah❌*";
global.dikit = "*dikit lagi, semangat ya :')*";
global.min_reward = 1000;
global.max_reward = 5000;

global.multiplier = 100; // The higher, The harder levelup

// Sticker WM
global.packname = "Sticker By";
global.author = "AbotMD";
global.wm = "©AbotMD 2023";
//=========== Requirements ==========//
global.colong1 = "Ciss 📸";
global.colong2 = "ʙy Ahmuq";
global.footer = "SIMPLE WHATSAPP BOT BY MUQ ッ";
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      level: "🧬",
      limit: "🌌",
      healt: "❤️",
      exp: "✉️",
      money: "💵",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🎁",
      mythic: "🗳️",
      legendary: "🗃️",
      pet: "🎁",
      sampah: "🗑",
      armor: "🥼",
      fishingrod: "🎣",
      pickaxe: "⛏️",
      sword: "⚔️",
      kayu: "🪵",
      batu: "🪨",
      iron: "⛓️",
      string: "🕸️",
      kuda: "🐎",
      kucing: "🐈",
      anjing: "🐕",
      makananpet: "🍖",
      gold: "👑",
      emerald: "💚",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  delete require.cache[file];
  require(file);
});
