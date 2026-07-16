const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "addstaff",

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
/addstaff @usuario`
                }
            )
        }

        const staff =
            cargarJSON(
                "./data/staffLiga.json",
                []
            )

        if (
            staff.includes(
                mencionado
            )
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "⚠️ Ese usuario ya pertenece al Staff Liga."
                }
            )
        }

        staff.push(
            mencionado
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

✅ Nuevo miembro agregado:

👤 @${mencionado.split("@")[0]}

⚔ Ahora puede gestionar la competición y apoyar la administración de la liga.`,
                mentions: [mencionado]
            }
        )
    }
}
