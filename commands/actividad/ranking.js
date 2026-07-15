const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "ranking",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const actividad =
            cargarJSON(
                "./data/actividad.json",
                {}
            )

        const ranking =
            Object.entries(
                actividad
            )
            .sort(
                (a,b) => b[1]-a[1]
            )
            .slice(0,10)

        let texto =
            "🏆 Ranking de actividad\n\n"

        const menciones = []

        ranking.forEach(
            ([usuario,mensajes],i) => {

                texto +=
`${i+1}. @${usuario.split("@")[0]}
💬 ${mensajes} mensajes

`

                menciones.push(
                    usuario
                )
            }
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto,
                mentions: menciones
            }
        )
    }
}
