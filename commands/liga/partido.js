const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "partido",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        if (args.length < 5) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Uso correcto:

/partido Titans_Esports Dragones_ML 25-07-2026 20:00 BO3`
                }
            )
        }

        const local =
            args[0].replaceAll("_", " ")

        const visitante =
            args[1].replaceAll("_", " ")

        const fecha = args[2]
        const hora = args[3]
        const formato = args[4]

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    equipos: {},
                    partidos: []
                }
            )

        liga.partidos.push({

            local,
            visitante,
            fecha,
            hora,
            formato

        })

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`📅 Partido registrado

🏠 ${local}
🆚
✈️ ${visitante}

📆 ${fecha}
🕒 ${hora}
🎮 ${formato}`
            }
        )
    }
}
