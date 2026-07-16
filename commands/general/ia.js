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

        try {

            const respuesta =
                await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
                )

            const datos =
                await respuesta.json()

            console.log(
                "MODELOS DISPONIBLES:"
            )

            datos.models.forEach(
                modelo => {

                    console.log(
                        modelo.name,
                        modelo.supportedGenerationMethods
                    )

                }
            )

            await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "✅ Revisa los logs de Render."
                }
            )

        } catch (error) {

            console.log(error)

            await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Error:

${error.message}`
                }
            )

        }

    }

}
