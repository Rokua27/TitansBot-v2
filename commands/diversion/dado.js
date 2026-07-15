module.exports = {

    nombre: "dado",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const numero =
            Math.floor(
                Math.random() * 6
            ) + 1

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🎲 Has lanzado el dado

Resultado:
*${numero}*`
            }
        )
    }
}
