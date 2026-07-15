const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "addequipo",

    admin: true,
    
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
                        "❌ Debes indicar un nombre.\n\nEjemplo:\n/addequipo Titans FC"
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
            liga.equipos[nombreEquipo]
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "⚠️ Ese equipo ya existe."
                }
            )
        }

        liga.equipos[nombreEquipo] = {
    pj: 0,
    pg: 0,
    pe: 0,
    pp: 0,
    pts: 0
        }

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`✅ Equipo registrado correctamente

🏆 Equipo:
${nombreEquipo}`
            }
        )
    }
}
