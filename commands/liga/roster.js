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
                    jugadores: {}
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
            ([nombre]) => {

                if (
    liga.equipos[equipo]?.capitan === nombre
) {

    texto +=
        `👑 ${nombre} (Capitán)\n`

} else {

    texto +=
        `👤 ${nombre}\n`
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
