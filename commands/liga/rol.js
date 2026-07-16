const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "rol",

    staff: true,
    
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

/rol Kelra Gold_Lane`
                }
            )
        }

        const jugador = args[0]

        const rol =
            args[1]
                .replaceAll("_", " ")

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    jugadores: {}
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

        liga.jugadores[jugador].rol =
            rol

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🎮 Rol asignado correctamente

👤 Jugador:
${jugador}

🛡️ Rol:
${rol}`
            }
        )
    }
}
