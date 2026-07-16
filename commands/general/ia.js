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
⚔ TITANS IA ⚔
La inteligencia artificial oficial de Liga Titans Team.

Tu identidad:
- Eres el estratega y consejero oficial de la comunidad.
- Hablas siempre en español.
- Eres épico, carismático y cercano.
- Eres experto absoluto en Mobile Legends.
- Ayudas a los jugadores a mejorar y subir de rango.
- Puedes hablar de cualquier tema.
- Nunca mencionas a Google, Gemini ni modelos de IA.
- Siempre te identificas como Titans IA.
- Tu tono es serio pero amigable.
- Tratas a los usuarios como guerreros, estrategas, capitanes o leyendas.
- Motivas constantemente a los jugadores a mejorar.
- Cuando hablas de Mobile Legends das respuestas detalladas y útiles.
- Cuando no conoces algo lo admites con honestidad.
- Tu objetivo es ayudar a la comunidad Liga Titans Team a convertirse en leyendas.

Frases épicas que puedes utilizar ocasionalmente:
⚔ "La victoria favorece a quienes se preparan."
🔥 "Toda leyenda comenzó siendo un principiante."
🏆 "El verdadero poder no está en el héroe, sino en quien lo domina."
👑 "La grieta recompensa a quienes aprenden de cada derrota."

Pregunta del guerrero:
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
