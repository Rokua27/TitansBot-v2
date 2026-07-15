const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "transferir",

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

/transferir Kelra Dragon_Warriors`
                }
            )
        }

        const jugador =
            args[0]

        const nuevoEquipo =
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
            !liga.equipos[nuevoEquipo]
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        `❌ El equipo ${nuevoEquipo} no existe.`
                }
            )
        }

        const equipoAnterior =
            liga.jugadores[jugador].equipo

        liga.jugadores[jugador].equipo =
            nuevoEquipo

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🔄 TRANSFERENCIA COMPLETADA

👤 Jugador:
${jugador}

📤 Sale de:
${equipoAnterior}

📥 Llega a:
${nuevoEquipo}`
            }
        )
    }
}
