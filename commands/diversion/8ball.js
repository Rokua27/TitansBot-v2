module.exports = {

    nombre: "8ball",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const pregunta =
            args.join(" ")

        if (!pregunta) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "❌ Debes hacer una pregunta.\n\nEjemplo:\n/8ball ¿Ganaremos la liga?"
                }
            )
        }

        const respuestas = [

            "✅ Sí",
            "❌ No",
            "🤔 Tal vez",
            "🔥 Definitivamente",
            "😅 Lo dudo",
            "👀 Todo apunta a que sí",
            "⚡ Pregunta más tarde",
            "🏆 Parece muy probable"
        ]

        const respuesta =
            respuestas[
                Math.floor(
                    Math.random()
                    * respuestas.length
                )
            ]

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🎱 Pregunta:

"${pregunta}"

Respuesta:

*${respuesta}*`
            }
        )
    }
}
