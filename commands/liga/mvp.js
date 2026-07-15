const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "mvp",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const jugador =
            args.join(" ")

        if (!jugador) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "❌ Debes indicar un jugador.\n\nEjemplo:\n/mvp Kelra"
                }
            )
        }

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    mvp: {}
                }
            )

        if (!liga.mvp[jugador]) {

            liga.mvp[jugador] = 0
        }

        liga.mvp[jugador]++

        guardarJSON(
            "./data/liga.json",
            liga
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`👑 MVP REGISTRADO

🏅 Jugador:
${jugador}

⭐ MVP acumulados:
${liga.mvp[jugador]}`
            }
        )
    }
}
