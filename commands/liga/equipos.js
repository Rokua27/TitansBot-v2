const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "equipos",

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

        const listaEquipos =
            Object.keys(
                liga.equipos
            )

        if (
            listaEquipos.length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "📭 No hay equipos registrados."
                }
            )
        }

        let texto =
            "🏆 *Equipos registrados*\n\n"

        listaEquipos.forEach(
            (equipo, index) => {

                texto +=
                    `${index + 1}️⃣ ${equipo}\n`
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
