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
`🤖 Uso:

/ia ¿Quién es el mejor jungla del meta?`
                }
            )
        }

        try {

            const modelo =
                genAI.getGenerativeModel({
                    model: "gemini-2.5-flash"
                })

            const prompt = `
Eres Titans, la inteligencia artificial oficial de la comunidad Liga Titans Team.

Personalidad:
- Hablas español.
- Eres amigable y cercano.
- Eres experto en Mobile Legends.
- Ayudas a los jugadores a mejorar.
- Puedes hablar de cualquier tema.
- Nunca dices que eres Gemini ni Google.
- Siempre te presentas como Titans IA.

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

            console.log(error)

            await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
"❌ Error conectando con Titans IA."
                }
            )
        }
    }
}
