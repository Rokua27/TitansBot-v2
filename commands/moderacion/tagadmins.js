module.exports = {

    nombre: "tagadmins",

    admin: true,
    
    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const grupo =
            mensaje.key.remoteJid

        const metadata =
            await sock.groupMetadata(
                grupo
            )

        const admins =
            metadata.participants.filter(
                p => p.admin
            )

        let texto =
            "👑 *Administradores del grupo*\n\n"

        const menciones = []

        admins.forEach(
            (admin) => {

                texto +=
                    `@${admin.id.split("@")[0]}\n`

                menciones.push(
                    admin.id
                )
            }
        )

        await sock.sendMessage(
            grupo,
            {
                text: texto,
                mentions: menciones
            }
        )
    }
}
