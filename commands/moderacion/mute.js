const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "mute",

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
                        "❌ Debes mencionar un usuario.\n\nEjemplo:\n/mute @usuario"
                }
            )
        }

        const silenciados =
            cargarJSON(
                "./data/silenciados.json",
                {}
            )

        silenciados[usuario] = {

            fecha: Date.now(),
            moderador: mensaje.key.participant
        }

        guardarJSON(
            "./data/silenciados.json",
            silenciados
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🔇 Usuario silenciado

👤 Usuario:
@${usuario.split("@")[0]}`,
                mentions: [usuario]
            }
        )
    }
}
