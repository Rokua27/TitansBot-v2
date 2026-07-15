const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "mutelist",

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const silenciados =
            cargarJSON(
                "./data/silenciados.json",
                {}
            )

        const lista =
            Object.keys(silenciados)

        if (!lista.length) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "✅ No hay usuarios silenciados."
                }
            )
        }

        let texto =
            "🔇 Usuarios silenciados:\n\n"

        lista.forEach(
            (usuario, index) => {

                texto +=
                    `${index + 1}. @${
                        usuario.split("@")[0]
                    }\n`
            }
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto,
                mentions: lista
            }
        )
    }
}
