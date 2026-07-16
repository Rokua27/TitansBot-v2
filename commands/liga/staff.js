const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "staff",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const staff =
            cargarJSON(
                "./data/staffLiga.json",
                []
            )

        if (
            staff.length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`🏆 STAFF LIGA

Actualmente no hay miembros registrados.`
                }
            )
        }

        let texto =
`🏆════════════════════🏆
      STAFF OFICIAL LIGA
🏆════════════════════🏆

`

        staff.forEach(
            (miembro, index) => {

                texto +=
`${index + 1}. 👑 @${miembro.split("@")[0]}\n`
            }
        )

        texto +=
`\n⚔ Organización oficial de la competición.`

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto,
                mentions: staff
            }
        )
    }
}
