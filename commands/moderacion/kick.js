module.exports = {

    nombre: "kick",

    admin: true,
    
    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const grupo =
            mensaje.key.remoteJid

        const usuario =
            mensaje.message.extendedTextMessage
            ?.contextInfo
            ?.mentionedJid?.[0]

        if (!usuario) {

            return await sock.sendMessage(
                grupo,
                {
                    text:
                        "❌ Debes mencionar un usuario.\n\nEjemplo:\n/kick @usuario"
                }
            )
        }

        try {

            await sock.groupParticipantsUpdate(
                grupo,
                [usuario],
                "remove"
            )

            await sock.sendMessage(
                grupo,
                {
                    text:
`👢 Usuario expulsado

👤 Usuario:
@${usuario.split("@")[0]}`,
                    mentions: [usuario]
                }
            )

        } catch (error) {

            console.log(error)

            await sock.sendMessage(
                grupo,
                {
                    text:
                        "❌ No pude expulsar al usuario.\nVerifica que el bot sea administrador."
                }
            )
        }
    }
}
