const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "roster",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const equipo =
            args.join(" ")
                .replaceAll("_", " ")

        if (!equipo) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Uso correcto:

/roster Titans_Esports`
                }
            )
        }

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    jugadores: {},
                    equipos: {}
                }
            )

        const jugadoresEquipo =
            Object.entries(
                liga.jugadores
            ).filter(
                ([_, datos]) =>
                    datos.equipo === equipo
            )

        if (
            jugadoresEquipo.length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`📭 No hay jugadores registrados para ${equipo}.`
                }
            )
        }

        let texto =
`🏆 ${equipo.toUpperCase()}

`

        jugadoresEquipo.forEach(
            ([nombre, datos]) => {

                if (
                    liga.equipos[equipo]?.capitan === nombre
                ) {

                    texto +=
`👑 ${nombre} • ${datos.rol || "Sin rol"}
`

                } else {

                    texto +=
`👤 ${nombre} • ${datos.rol || "Sin rol"}
`

                }
            }
        )

        texto +=
`\n👥 Total jugadores: ${jugadoresEquipo.length}`

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto
            }
        )

    }

}
