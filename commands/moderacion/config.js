const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "config",

    admin: true,

    ejecutar: async (
        sock,
        mensaje
    ) => {

        const config =
            cargarJSON(
                "./data/configGrupo.json",
                {
                    welcome: true,
                    bye: true
                }
            )

        const texto =
`⚙════════════════════⚙
     CONFIGURACIÓN DEL GRUPO
⚙════════════════════⚙

👋 Bienvenida:
${config.welcome ? "✅ Activada" : "❌ Desactivada"}

🚪 Despedida:
${config.bye ? "✅ Activada" : "❌ Desactivada"}

🛡 Acceso administrativo:
✅ Activado

🏆 Sistema Liga MLBB:
✅ Activo

🤖 TitansBot V2
⚙════════════════════⚙`

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: texto
            }
        )
    }
}
