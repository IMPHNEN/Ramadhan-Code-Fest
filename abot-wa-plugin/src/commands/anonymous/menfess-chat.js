let handler = async (m, { conn, usedPrefix, command, text: q }) => {
  command = command.toLowerCase();
  conn.menfess = conn.menfess ? conn.menfess : {};
  const { body, reply, from, sender } = m;
  const desc = `*Menfess Bot*\n\n*Example :*\n ◦ ${usedPrefix}menfess 628xxxxx`;
  button = [
    { buttonId: `.accmenfess`, buttonText: { displayText: "Terima" }, type: 1 },
    {
      buttonId: `.tolakmenfess`,
      buttonText: {
        displayText: "Tolak",
      },
      type: 1,
    },
  ];
  let id = m.sender;
  find = Object.values(conn.menfess).find((menpes) => menpes.status == "wait");
  roof = Object.values(conn.menfess).find((menpes) =>
    [menpes.a, menpes.b].includes(m.sender)
  );

  switch (command) {
    case "menfesschat":
      if (roof) return m.reply("Kamu masih berada dalam Obrolan!");
      if (!q) throw desc;
      if (!q.startsWith("628")) throw desc;
      text = q + "@s.whatsapp.net";
      txt = "*Menfess Chat*\n\n";
      txt += `_Hallo, Seseorang telah mengajakmu bermain chat menfess di bot ini_\n\n`;
      txt += `*Balas pesan ini ( terima / tolak )*`;
      reply(`*^Done, silahkan tunggu dia menerima ajakan chatmu..*`);
      conn.sendMessage(
        text,
        { text: txt, footer: global.footer, buttons: button, headerType: 1 },
        { adReply: true }
      );
      conn.menfess[id] = {
        id: id,
        a: m.sender,
        b: text,
        status: "wait",
      };
      break;

    case "accmenfess":
      if (!roof) return m.reply("Kamu belum memulai menfess..");
      try {
        find.b = m.sender;
        find.status = "chatting";
        conn.menfess[find.id] = { ...find };
        find = Object.values(conn.menfess).find((menpes) =>
          [menpes.a, menpes.b].includes(m.sender)
        );
        conn.sendMessage(
          find.a,
          {
            text: `_Done, sekarang anda bisa chat lewat bot dengan dia.._\n\n*NOTE : Jika ingin berhenti dari menfess, silahkan ketik _.stopmenfess_ Untuk hapus session kalian..*`,
          },
          { adReply: true }
        );
        await reply(
          `Done, sekarang anda bisa chat lewat bot dengan dia.._\n\n*NOTE : Jika ingin berhenti dari menfess, silahkan ketik _.stopmenfess_ Untuk hapus session kalian..* `
        );
      } catch (e) {
        throw false;
      }
      break;

    case "tolakmenfess":
      if (!roof) return m.reply("Kamu belum memulai menfess..");
      find = Object.values(conn.menfess).find((menpes) =>
        [menpes.a, menpes.b].includes(m.sender)
      );
      await conn.sendMessage(find.a, {
        text: `Yahhh :( Dia Menolak bermain menfess.._\n\n Sabar Ya banh :v`,
        withTag: true,
      });
      reply(`Done, menolak menfess chat`);
      delete conn.menfess[find.id];
      return !0;
      break;
  }
};

handler.command = ["menfesschat", "tolakmenfess", "accmenfess"];
handler.private = true;
handler.tags = ["anonymous"];
handler.help = ["menfesschat", "tolakmenfess", "accmenfess"];
module.exports = handler;

//Wm By Kimimaru
//github: https://github.com/K1mimaru
