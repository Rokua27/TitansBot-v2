const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "topmvp",

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
                        "📭 No existen MVP registrados."
                }
            )
        }

        ranking.sort(
            (a, b) => b[1] - a[1]
        )

        const top3 =
            ranking.slice(0, 3)

        let texto =
`🏆 TOP MVP TEMPORADA 🏆

`

        const medallas =
            ["🥇", "🥈", "🥉"]

        top3.forEach(
            ([jugador, cantidad], index) => {

                texto +=
`${medallas[index]} ${jugador}
⭐ ${cantidad} MVP

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
