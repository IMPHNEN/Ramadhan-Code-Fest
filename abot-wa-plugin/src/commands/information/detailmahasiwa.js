let handler = async (m, { text, conn, usedPrefix, args, command }) => {
  try {
    if (!text)
      return m.reply(
        `Sebelumnya cari dulu nimnya dari ${usedPrefix}mahasiwa untuk mendapatkan nimnya untuk menggunakan fiture ini\n\nContoh : ${usedPrefix}${command} 1990343064`
      );
    let findId = await scrap.mahaSiswa(text);
    const mahasiswa = findId.msg.find((mhs) => mhs.Nim === text);
    if (mahasiswa) {
      let json = await scrap.detailMahasiswa(mahasiswa.id);
      let caption = `乂  *Data Mahasiswa*\n\n`;
      caption += `	◦  *Nama* : ${json.msg.dataumum.nm_pd}\n`;
      caption += `	◦  *Nim* : ${json.msg.dataumum.nipd}\n`;
      caption += `	◦  *Jenis Kelamin* : ${json.msg.dataumum.jk}\n`;
      caption += `	◦  *Nama Kampus* : ${json.msg.dataumum.namapt}\n`;
      caption += `	◦  *Jenjang* : ${json.msg.dataumum.namajenjang}\n`;
      caption += `	◦  *Nama Prodi* : ${json.msg.dataumum.namaprodi}\n`;
      if (json.msg.dataumum.mulai_smt.slice(-1) === "1") {
        caption += ` ◦ *Mulai Semester* : ${json.msg.dataumum.mulai_smt.slice(
          0,
          -1
        )}\n`;
      } else {
        caption += ` ◦ *Mulai Semester* : ${json.msg.dataumum.mulai_smt}\n`;
      }
      caption += `	◦  *Status Awal Mahasiswa* : ${json.msg.dataumum.nm_jns_daftar}\n\n`;
      caption += global.footer;
      conn.reply(m.chat, caption, m);
    } else {
      conn.reply(m.chat, "Data Tidak Ditemukan", m);
    }
  } catch (err) {
    console.log(err);
    m.reply("Maaf, sepertinya ada yang error");
  }
};

handler.help = ["detailmahasiswa"];
handler.tags = ["information"];
handler.command = /^(detailmahasiswa)$/i;

module.exports = handler;
