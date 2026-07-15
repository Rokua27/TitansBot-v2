const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "tabla",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    equipos: {}
                }
            )

        const equipos =
            Object.entries(
                liga.equipos
            )

        if (
            equipos.length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "📭 No hay equipos registrados."
                }
            )
        }

        equipos.sort(
            (a, b) => {

                if (
                    b[1].pts !== a[1].pts
                ) {
                    return (
                        b[1].pts -
                        a[1].pts
                    )
                }

                if (
                    b[1].pg !== a[1].pg
                ) {
                    return (
                        b[1].pg -
                        a[1].pg
                    )
                }

                return (
                    a[1].pp -
                    b[1].pp
                )
            }
        )

        let texto =
`🏆 *LIGA TITANS TEAMS*

┌──────────────────────
│ POS │ EQUIPO │ PTS
├──────────────────────
`

        equipos.forEach(
            ([nombre, datos], index) => {

                texto +=
`${index + 1}️⃣ ${nombre}
PJ:${datos.pj} | PG:${datos.pg} | PE:${datos.pe} | PP:${datos.pp}
PTS: ${datos.pts}

`
            }
        )

        texto +=
`└──────────────────────`

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto
            }
        )
    }
}
