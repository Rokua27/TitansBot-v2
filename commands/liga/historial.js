const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "historial",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const equipo =
            args.join(" ")
                .replaceAll("_", " ")

        if (!equipo) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Uso correcto:

/historial Titans_Esports`
                }
            )
        }

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    resultados: []
                }
            )

        const partidas =
            liga.resultados?.filter(
                r =>
                    r.local === equipo ||
                    r.visitante === equipo
            ) || []

        if (
            partidas.length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        `📭 No existen batallas registradas para ${equipo}.`
                }
            )
        }

        let victorias = 0
        let empates = 0
        let derrotas = 0

        let texto =
`📜 HISTORIAL DE ${equipo.toUpperCase()}

`

        partidas.forEach(
            batalla => {

                let icono = "🤝"

                if (
                    batalla.local === equipo
                ) {

                    if (
                        batalla.resultadoLocal >
                        batalla.resultadoVisitante
                    ) {
                        victorias++
                        icono = "✅"
                    }
                    else if (
                        batalla.resultadoLocal <
                        batalla.resultadoVisitante
                    ) {
                        derrotas++
                        icono = "❌"
                    }
                    else {
                        empates++
                    }

                } else {

                    if (
                        batalla.resultadoVisitante >
                        batalla.resultadoLocal
                    ) {
                        victorias++
                        icono = "✅"
                    }
                    else if (
                        batalla.resultadoVisitante <
                        batalla.resultadoLocal
                    ) {
                        derrotas++
                        icono = "❌"
                    }
                    else {
                        empates++
                    }
                }

                texto +=
`${icono} ${batalla.local}
${batalla.resultadoLocal} - ${batalla.resultadoVisitante}
${batalla.visitante}

`
            }
        )

        texto +=
`📊 RESUMEN

✅ Victorias: ${victorias}
🤝 Empates: ${empates}
❌ Derrotas: ${derrotas}`

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto
            }
        )
    }
}
