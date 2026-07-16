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

    const modelos =
        await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
        )

    const datos =
        await modelos.json()

    console.log("MODELOS DISPONIBLES:")

    datos.models.forEach(modelo => {
        console.log(
            modelo.name,
            modelo.supportedGenerationMethods
        )
    })

    return await sock.sendMessage(
        mensaje.key.remoteJid,
        {
            text: "✅ Revisa los logs de Render."
        
                }
            )

        } 
        catch (error) {

    console.log("ERROR GEMINI:")
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
    
