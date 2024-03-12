let handler = m => m

handler.before = async function (m, { match }) {
    const { sender, body, from, quoted } = m;
    conn.menfess = conn.menfess ? conn.menfess : {}
    const find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(m.sender) && menpes.status == 'chatting')
        if(m.isGroup) return
        if(find == undefined) return
        const to = find.a == m.sender ? find.b : find.a
        conn.copyNForward(to, m, true)
    return !0
}

module.exports = handler

//Wm By Kimimaru
//github: https://github.com/K1mimaru