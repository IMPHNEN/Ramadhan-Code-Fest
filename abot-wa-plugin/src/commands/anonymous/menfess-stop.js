let handler = async(m, { conn, usedPrefix, command }) => {
conn.menfess = conn.menfess ? conn.menfess : {}
    const { body, reply, from, sender } = m;
    find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(m.sender))
    if(!find) return m.reply("Kamu belum memulai menfess..")
    conn.sendMessage(find.a, {text: "_Partner meninggalkan Obrolan.._"})
    conn.sendMessage(find.b, {text: "_Partner meninggalkan Obrolan.._"})
    await m.reply("*^Done..*")
    delete conn.menfess[find.id]
    return !0
}

handler.command = /^(stopmenfess)$/i
handler.private = true
handler.tags = ['anonymous']
handler.help = ['stopmenfess']
module.exports = handler

//Wm By Kimimaru
//github: https://github.com/K1mimaru