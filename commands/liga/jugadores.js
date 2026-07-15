const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "jugadores",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    jugadores: {}
                }
            )

        const jugadores =
            Object.entries(
                liga.jugadores
            )

        if (
            jugadores.length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "📭 No hay jugadores registrados."
                }
            )
        }

        let texto =
            "👥 *ROSTERS REGISTRADOS*\n\n"

        jugadores.forEach(
            ([nombre, datos]) => {

                texto +=
`👤 ${nombre}
🏆 ${datos.equipo}

`
            }
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto
            }
        )
    }
}
