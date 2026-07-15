const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "jugador",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const nombreJugador =
            args.join(" ")

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    jugadores: {}
                }
            )

        const jugador =
            liga.jugadores[
                nombreJugador
            ]

        if (!jugador) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "❌ Jugador no encontrado."
                }
            )
        }

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`👤 ${nombreJugador}

🏆 Escuadra:
${jugador.equipo}

⭐ MVP:
${jugador.mvp}`
            }
        )
    }
}
