module.exports = {

    nombre: "ping",

    ejecutar: async (
        sock,
        msg
    ) => {

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "🏓 Pong"
            }
        )
    }
}
