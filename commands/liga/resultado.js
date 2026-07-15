const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "resultado",

    admin: true,
    
    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        if (args.length < 4) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Uso correcto:

/resultado Titans_Esports 2 Dragones_ML 0`
                }
            )
        }

        const local =
            args[0].replaceAll("_", " ")

        const marcadorLocal =
            parseInt(args[1])

        const visitante =
            args[2].replaceAll("_", " ")

        const marcadorVisitante =
            parseInt(args[3])

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    equipos: {},
                    batallas : []
                }
            )

        if (!liga.equipos[local]) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        `❌ El equipo "${local}" no existe.`
                }
            )
        }

        if (!liga.equipos[visitante]) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        `❌ El equipo "${visitante}" no existe.`
                }
            )
        }

        const equipoLocal =
            liga.equipos[local]

        const equipoVisitante =
            liga.equipos[visitante]

        equipoLocal.pj++
        equipoVisitante.pj++

        if (
            marcadorLocal >
            marcadorVisitante
        ) {

            equipoLocal.pg++
            equipoVisitante.pp++

            equipoLocal.pts += 3

        } else if (
            marcadorVisitante >
            marcadorLocal
        ) {

            equipoVisitante.pg++
            equipoLocal.pp++

            equipoVisitante.pts += 3

        } else {

            equipoLocal.pe++
            equipoVisitante.pe++

            equipoLocal.pts += 1
            equipoVisitante.pts += 1
        }

        liga.batallas.push({

            local,
            marcadorLocal,
            visitante,
            marcadorVisitante,
            fecha:
                new Date()
                .toLocaleDateString()

        })

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
  text:
`⚔️ BATALLA FINALIZADA ⚔️

🏆 ${local}
${marcadorLocal} 🆚 ${marcadorVisitante}
🏆 ${visitante}

📊 La clasificación de la liga ha sido actualizada.`
            }
        )
    }
}
