const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "welcome",

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

/welcome on
/welcome off`
                }
            )
        }

        config.welcome =
            opcion === "on"

        guardarJSON(
            "./data/configGrupo.json",
            config
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
                    config.welcome
                    ? "✅ Bienvenidas activadas."
                    : "❌ Bienvenidas desactivadas."
            }
        )
    }
}
