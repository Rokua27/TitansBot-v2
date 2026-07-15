module.exports = {

    nombre: "moneda",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const resultado =
            Math.random() < 0.5
            ? "Cara 🪙"
            : "Cruz 🪙"

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🪙 Lanzando moneda...

Resultado:
*${resultado}*`
            }
        )
    }
}
