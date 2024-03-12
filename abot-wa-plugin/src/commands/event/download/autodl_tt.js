let handler = async (m, { conn }) => {
  try {
    let body = typeof m.text == "string" ? m.text : false;
    const regex =
      /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
    const extract = body ? Func.generateLink(body) : null;
    if (extract) {
      const links = extract.filter((v) => Func.ttFixed(v).match(regex));
      if (links.length != 0) {
        await m.reply(wait);
        let old = new Date();
        links.map(async (link) => {
          let json = await api.tiktok(Func.ttFixed(link));
          if (!json.id)
            return conn.reply(
              m.chat,
              `🚩 Error! private videos or videos not available.`,
              m
            );
          let caption = `乂  *T I K T O K*\n\n`;
          caption += `	◦  *Author* : ${json.author.name} (@${json.author.unique_id})\n`;
          caption += `	◦  *Views* : ${Func.formatter(json.stats.playCount)}\n`;
          caption += `	◦  *Likes* : ${Func.formatter(json.stats.likeCount)}\n`;
          caption += `	◦  *Shares* : ${Func.formatter(json.stats.shareCount)}\n`;
          caption += `	◦  *Comments* : ${Func.formatter(
            json.stats.commentCount
          )}\n`;
          caption += `	◦  *Duration* : ${Func.toTime(json.video.duration)}\n`;
          caption += `	◦  *Sound* : ${json.music.title} - ${json.music.author}\n`;
          caption += `	◦  *Caption* : ${json.title || "-"}\n`;
          caption += `	◦  *Fetching* : ${(new Date() - old) * 1} ms\n\n`;
          caption += global.footer;
          conn.sendFile(
            m.chat,
            json.video.noWatermark,
            "video.mp4",
            caption,
            m
          );
        });
      }
    }
  } catch (e) {
    return conn.reply(m.chat, Func.jsonFormat(e), m);
  }
};

handler.customPrefix =
  /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/i;
handler.command = new RegExp();
handler.limit = true;
module.exports = handler;
