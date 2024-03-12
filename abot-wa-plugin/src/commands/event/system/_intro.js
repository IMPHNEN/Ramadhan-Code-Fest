let handler = async (m) => {
  let krtu = `Kartu Intro`;
  m.reply(
    `
      *「 Kartu Intro 」*
• *Nama   :* 
• *Gender  :* 
• *Umur    :* 
• *Hobby   :* 
• *Asal     :* 
• *Agama  :* 
• *Status   :* 
`.trim()
  );
};
handler.command = /^(intro)$/i;

module.exports = handler;
