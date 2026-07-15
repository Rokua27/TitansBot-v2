const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "addjugador",

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

/addjugador Kelra Titans_Esports`
                }
            )
        }

        const nombreJugador =
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
            !liga.equipos[equipo]
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        `❌ El equipo "${equipo}" no existe.`
                }
            )
        }

        liga.jugadores[
            nombreJugador
        ] = {

            equipo,
            mvp: 0

        }

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`👤 Jugador registrado

🏅 Jugador:
${nombreJugador}

🏆 Escuadra:
${equipo}`
            }
        )
    }
}
