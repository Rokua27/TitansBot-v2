const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "removeequipo",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const nombreEquipo =
            args.join(" ")

        if (!nombreEquipo) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "❌ Debes indicar un equipo.\n\nEjemplo:\n/removeequipo Titans FC"
                }
            )
        }

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    equipos: {},
                    goleadores: {},
                    mvp: {},
                    partidos: []
                }
            )

        if (
            !liga.equipos[nombreEquipo]
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "⚠️ Ese equipo no existe."
                }
            )
        }

        delete liga.equipos[nombreEquipo]

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🗑️ Equipo eliminado correctamente

🏆 Equipo:
${nombreEquipo}`
            }
        )
    }
}
