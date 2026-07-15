const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "unwarn",

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
                        "❌ Debes mencionar a un usuario."
                }
            )
        }

        const advertencias =
            cargarJSON(
                "./data/advertencias.json",
                {}
            )

        if (
            !advertencias[usuario]
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "ℹ️ Ese usuario no tiene advertencias."
                }
            )
        }

        advertencias[usuario]--

        if (
            advertencias[usuario] <= 0
        ) {
            delete advertencias[usuario]
        }

        guardarJSON(
            "./data/advertencias.json",
            advertencias
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`✅ Advertencia eliminada

👤 Usuario:
@${usuario.split("@")[0]}

📊 Advertencias restantes:
${advertencias[usuario] || 0}/10`,
                mentions: [usuario]
            }
        )
    }
}
