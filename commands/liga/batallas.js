const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "batallas",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    batallas: []
                }
            )

        if (
            liga.batallas.length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "📭 No hay batallas programadas."
                }
            )
        }

        let texto =
            "⚔️ *PRÓXIMAS BATALLAS*\n\n"

        liga.batallas.forEach(
            (batalla, index) => {

                texto +=
`${index + 1}️⃣ ${batalla.local}
🆚 ${batalla.visitante}

📅 ${batalla.fecha}
🕒 ${batalla.hora}
🎮 ${batalla.formato}

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
