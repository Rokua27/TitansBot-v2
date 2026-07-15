const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "warnings",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const usuario =
            mensaje.message.extendedTextMessage
            ?.contextInfo
            ?.mentionedJid?.[0]

        if (!usuario) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "❌ Debes mencionar a un usuario.\n\nEjemplo:\n/warnings @usuario"
                }
            )
        }

        const advertencias =
            cargarJSON(
                "./data/advertencias.json",
                {}
            )

        const cantidad =
            advertencias[usuario] || 0

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`📊 Advertencias actuales

👤 Usuario:
@${usuario.split("@")[0]}

⚠️ Advertencias:
${cantidad}/10`,
                mentions: [usuario]
            }
        )
    }
}
