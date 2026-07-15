module.exports = {

    nombre: "tagall",

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

        const participantes =
            metadata.participants

        let texto =
            "📢 *Mención general*\n\n"

        const menciones = []

        participantes.forEach(
            (usuario) => {

                texto +=
                    `@${usuario.id.split("@")[0]}\n`

                menciones.push(
                    usuario.id
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
