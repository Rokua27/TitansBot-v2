const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "quitarrol",

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

        const roles =
            cargarJSON(
                "./data/roles.json",
                {}
            )

        delete roles[usuario]

        guardarJSON(
            "./data/roles.json",
            roles
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🗑️ Rol eliminado

👤 Usuario:
@${usuario.split("@")[0]}`,
                mentions: [usuario]
            }
        )
    }
}
