module.exports = {

    nombre: "promote",

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
                        "❌ Debes mencionar un usuario."
                }
            )
        }

        try {

            await sock.groupParticipantsUpdate(
                grupo,
                [usuario],
                "promote"
            )

            await sock.sendMessage(
                grupo,
                {
                    text:
`👑 Usuario ascendido a administrador

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
                        "❌ No pude ascender al usuario."
                }
            )
        }
    }
}
