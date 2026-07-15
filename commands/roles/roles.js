const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "roles",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const roles =
            cargarJSON(
                "./data/roles.json",
                {}
            )

        if (
            Object.keys(roles).length === 0
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "📭 No hay roles asignados."
                }
            )
        }

        let texto =
            "👑 Roles registrados\n\n"

        const menciones = []

        Object.keys(
            roles
        ).forEach(usuario => {

            texto +=
                `@${usuario.split("@")[0]} ➜ ${roles[usuario]}\n`

            menciones.push(
                usuario
            )
        })

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto,
                mentions: menciones
            }
        )
    }
}
