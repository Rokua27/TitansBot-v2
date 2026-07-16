const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "removestaff",

    admin: true,

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const mencionado =
            mensaje.message.extendedTextMessage
                ?.contextInfo
                ?.mentionedJid?.[0]

        if (!mencionado) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Debes mencionar un usuario.

Ejemplo:
/removestaff @usuario`
                }
            )
        }

        let staff =
            cargarJSON(
                "./data/staffLiga.json",
                []
            )

        if (
            !staff.includes(
                mencionado
            )
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "⚠️ Ese usuario no pertenece al Staff Liga."
                }
            )
        }

        staff =
            staff.filter(
                usuario =>
                    usuario !== mencionado
            )

        guardarJSON(
            "./data/staffLiga.json",
            staff
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🏆 STAFF LIGA ACTUALIZADO

❌ Miembro removido:

👤 @${mencionado.split("@")[0]}

⚔ Ya no posee permisos de Staff Liga.`,
                mentions: [mencionado]
            }
        )
    }
}
