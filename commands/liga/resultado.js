const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "resultado",

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
`❌ Formato incorrecto

Ejemplo:
 /resultado Titans_FC 3 Dragones_United 1`
                }
            )
        }

        const local =
            args[0].replaceAll("_", " ")

        const golesLocal =
            parseInt(args[1])

        const visitante =
            args[2].replaceAll("_", " ")

        const golesVisitante =
            parseInt(args[3])

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    equipos: {},
                    goleadores: {},
                    mvp: {},
                    partidos: []
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

        equipoLocal.gf += golesLocal
        equipoLocal.gc += golesVisitante

        equipoVisitante.gf += golesVisitante
        equipoVisitante.gc += golesLocal

        if (golesLocal > golesVisitante) {

            equipoLocal.pg++
            equipoVisitante.pp++

            equipoLocal.pts += 3

        } else if (
            golesVisitante > golesLocal
        ) {

            equipoVisitante.pg++
            equipoLocal.pp++

            equipoVisitante.pts += 3

        } else {

            equipoLocal.pe++
            equipoVisitante.pe++

            equipoLocal.pts++
            equipoVisitante.pts++
        }

        equipoLocal.dg =
            equipoLocal.gf -
            equipoLocal.gc

        equipoVisitante.dg =
            equipoVisitante.gf -
            equipoVisitante.gc

        liga.partidos.push({

            local,
            golesLocal,
            visitante,
            golesVisitante,
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
`⚽ Resultado registrado

🏠 ${local} ${golesLocal}
🛫 ${visitante} ${golesVisitante}`
            }
        )
    }
          }
