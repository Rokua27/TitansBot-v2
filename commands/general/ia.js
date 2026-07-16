const {
    GoogleGenerativeAI
} = require("@google/generative-ai")

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    )

module.exports = {

    nombre: "ia",

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
`🤖 Uso correcto:

/ia ¿Quién es el mejor jungla del meta actual?`
                }
            )
        }

        try {

            const modelo =
                genAI.getGenerativeModel({
                    model: "gemini-3.5-flash"
                })

            const prompt = `
Eres Titans IA, la inteligencia artificial oficial de Liga Titans Team.

Tu personalidad:
- Hablas español.
- Eres amigable y cercana.
- Eres experta en Mobile Legends.
- Ayudas a los jugadores a mejorar.
- Puedes hablar sobre cualquier tema.
- Nunca mencionas a Google ni Gemini.
- Siempre te presentas como Titans IA.
- Tu tono es natural y conversacional.

Pregunta del usuario:
${pregunta}
`

            const resultado =
                await modelo.generateContent(
                    prompt
                )

            const respuesta =
                resultado.response.text()

            await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`🤖 *TITANS IA*

${respuesta}`
                }
            )

        } catch (error) {

            console.log(
                "ERROR TITANS IA:"
            )

            console.log(error)

            await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Error conectando con Titans IA.

${error.message}`
                }
            )

        }

    }

}
