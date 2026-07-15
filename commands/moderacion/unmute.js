const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "unmute",

admin: true,
    
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
                        "❌ Debes mencionar un usuario."
                }
            )
        }

        const silenciados =
            cargarJSON(
                "./data/silenciados.json",
                {}
            )

        delete silenciados[usuario]

        guardarJSON(
            "./data/silenciados.json",
            silenciados
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🔊 Usuario reactivado

👤 Usuario:
@${usuario.split("@")[0]}`,
                mentions: [usuario]
            }
        )
    }
}
