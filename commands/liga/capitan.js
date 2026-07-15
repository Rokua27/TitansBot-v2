const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "capitan",

    admin: true,
    
    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        if (args.length < 2) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Uso correcto:

/capitan Kelra Titans_Esports`
                }
            )
        }

        const jugador =
            args[0]

        const equipo =
            args.slice(1)
                .join(" ")
                .replaceAll("_", " ")

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    jugadores: {},
                    equipos: {}
                }
            )

        if (
            !liga.jugadores[jugador]
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        `❌ El jugador ${jugador} no existe.`
                }
            )
        }

        if (
            liga.jugadores[jugador].equipo !== equipo
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        `❌ ${jugador} no pertenece a ${equipo}.`
                }
            )
        }

        liga.equipos[equipo].capitan =
            jugador

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`👑 Capitán asignado

🏆 Escuadra:
${equipo}

👤 Capitán:
${jugador}`
            }
        )
    }
}
