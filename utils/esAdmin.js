module.exports = async function esAdmin(
    sock,
    jid,
    participante
) {

    const metadata =
        await sock.groupMetadata(jid)

    const admins =
        metadata.participants.filter(
            p => p.admin !== null
        )

    return admins.some(
        admin =>
            admin.id === participante
    )
}
