module.exports = async (
    sock,
    jid,
    usuario
) => {

    try {

        const metadata =
            await sock.groupMetadata(jid)

        const admins =
            metadata.participants.filter(
                p => p.admin
            )

        return admins.some(
            admin =>
                admin.id === usuario
        )

    } catch {

        return false
    }

}
