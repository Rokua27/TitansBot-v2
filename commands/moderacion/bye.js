const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "bye",

    admin: true,
    
    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const config =
            cargarJSON(
                "./data/configGrupo.json",
                {
                    welcome: true,
                    bye: true
                }
            )

        const opcion =
            args[0]?.toLowerCase()

        if (
            opcion !== "on" &&
            opcion !== "off"
        ) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`Uso correcto:

/bye on
/bye off`
                }
            )
        }

        config.bye =
            opcion === "on"

        guardarJSON(
            "./data/configGrupo.json",
            config
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
                    config.bye
                    ? "✅ Despedidas activadas."
                    : "❌ Despedidas desactivadas."
            }
        )
    }
}
