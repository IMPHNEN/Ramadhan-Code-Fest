let handler = async function (m, { text, command }) {
  if (command == "ebinary") {
    if (!text && !m.quoted) throw `Kirim/reply text dengan caption #${command}`;
    let teks = text
      ? text
      : m.quoted && m.quoted.text
      ? m.quoted.text
      : "Hanya Dapat Merespon text, Tidak dapat merespon stiker!";
    let eb = await eBinary(teks);
    m.reply(eb);
  } else if (command == "dbinary") {
    if (!text && !m.quoted) throw `Kirim/reply text dengan caption #${command}`;
    let teks = text
      ? text
      : m.quoted && m.quoted.text
      ? m.quoted.text
      : "Hanya Dapat Merespon text, Tidak dapat merespon stiker!";
    let db = await dBinary(teks);
    m.reply(db);
  }
};
handler.help = ["ebinary", "dbinary"];
handler.tags = ["tools"];

handler.command = /^ebinary|dbinary$/i;

module.exports = handler;

function dBinary(str) {
  let newBin = str.split(" ").map((hex) => {
    return Buffer.from(hex, "hex").toString("binary");
  });
  let binCode = [];
  for (i = 0; i < newBin.length; i++) {
    binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
  }
  return binCode.join("");
}

function eBinary(str = "") {
  let res = "";
  res = str
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2);
    })
    .join(" ");
  let hex = res.split(" ").map((char) => {
    return Buffer.from(char, "binary").toString("hex");
  });
  return hex.join(" ");
}
