module.exports = {

    nombre: "actividad",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const usuario =
            mensaje.key.participant

        const actividad =
            require("../../data/actividad.json")

        const mensajes =
            actividad[usuario] || 0

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`📊 Tu actividad actual

💬 Mensajes enviados:
${mensajes}`
            }
        )
    }
}
