const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "mvps",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    mvp: {}
                }
            )

        const ranking =
            Object.entries(
                liga.mvp
            )

        if (
            ranking.length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "📭 No hay MVP registrados."
                }
            )
        }

        ranking.sort(
            (a, b) => b[1] - a[1]
        )

        let texto =
            "👑 *RANKING MVP*\n\n"

        ranking.forEach(
            ([jugador, cantidad], index) => {

                texto +=
`${index + 1}️⃣ ${jugador}
⭐ ${cantidad} MVP\n\n`
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
