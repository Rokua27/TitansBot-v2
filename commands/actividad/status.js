const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "stats",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const actividad =
            cargarJSON(
                "./data/actividad.json",
                {}
            )

        const totalUsuarios =
            Object.keys(
                actividad
            ).length

        const totalMensajes =
            Object.values(
                actividad
            ).reduce(
                (a,b)=>a+b,
                0
            )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`📈 Estadísticas generales

👥 Usuarios registrados:
${totalUsuarios}

💬 Mensajes registrados:
${totalMensajes}`
            }
        )
    }
}
