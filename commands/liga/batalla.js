const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "batalla",

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

/batalla Titans_Esports Dragon_Warriors 25-07-2025 20:00 BO3`
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
                    batallas: []
                }
            )

        liga.batallas.push({

            local,
            visitante,
            fecha,
            hora,
            formato,
            estado: "Programada"

        })

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`⚔️ BATALLA PROGRAMADA ⚔️

🏆 ${local}
🆚
🏆 ${visitante}

📅 ${fecha}
🕒 ${hora}
🎮 ${formato}`
            }
        )
    }
}
