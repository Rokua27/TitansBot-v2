module.exports = {

    nombre: "demote",

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
                        "❌ Debes mencionar un usuario."
                }
            )
        }

        try {

            await sock.groupParticipantsUpdate(
                grupo,
                [usuario],
                "demote"
            )

            await sock.sendMessage(
                grupo,
                {
                    text:
`⬇️ Usuario removido de administración

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
                        "❌ No pude quitar los permisos."
                }
            )
        }
    }
}
