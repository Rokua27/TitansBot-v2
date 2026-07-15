const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "resetwarnings",

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
                        "❌ Debes mencionar un usuario.\n\nEjemplo:\n/resetwarnings @usuario"
                }
            )
        }

        const advertencias =
            cargarJSON(
                "./data/advertencias.json",
                {}
            )

        delete advertencias[usuario]

        guardarJSON(
            "./data/advertencias.json",
            advertencias
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`✅ Historial de advertencias eliminado

👤 Usuario:
@${usuario.split("@")[0]}

⚠️ Advertencias actuales:
0/10`,
                mentions: [usuario]
            }
        )
    }
}
