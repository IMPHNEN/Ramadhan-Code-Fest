let handler = async (m, { conn }) => {
  try {
    let body = typeof m.text == "string" ? m.text : false;
    const regex =
      /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/;
    const extract = body ? Func.generateLink(body) : null;
    if (extract) {
      const links = extract.filter((v) => Func.ttFixed(v).match(regex));
      if (links.length != 0) {
        await m.reply(wait);
        let old = new Date();
        links.map(async (link) => {
          let json = await api.fbdl(link);
          if (!json.status)
            return conn.reply(
              m.chat,
              `🚩 Error! private videos or videos not available.`,
              m
            );
          json.result.map(async (v) => {
            conn.sendFile(
              m.chat,
              v,
              "",
              `🍟 *Fetching* : ${(new Date() - old) * 1} ms`,
              m
            );
            await conn.delay(1500);
          });
        });
      }
    }
  } catch (e) {
    return conn.reply(m.chat, Func.jsonFormat(e), m);
  }
};

handler.customPrefix =
  /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/i;
handler.command = new RegExp();
handler.limit = true;
module.exports = handler;
