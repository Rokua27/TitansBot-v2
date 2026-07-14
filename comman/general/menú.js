module.exports = {
    nombre: "menu",

    descripcion: "Muestra el menú principal",

    ejecutar: async (sock, mensaje) => {

        const menu = `
🏆 *${require("../../systems/config").nombreBot}*

📦 Versión: ${require("../../systems/config").version}

━━━━━━━━━━━━━━

📋 *GENERAL*
/ping
/menu

👥 *ROLES*
/rol

🛡️ *MODERACIÓN*
/advertir
/silenciar

🏆 *LIGA*
/tabla
/jornada
/resultados
`

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: menu
            }
        )

    }
}
