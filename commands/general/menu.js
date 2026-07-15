module.exports = {

    nombre: "menu",

    ejecutar: async (
        sock,
        msg
    ) => {

        const menu = `
🤖 *TitansBot V2*

📌 Comandos disponibles

/general
• /ping
• /menu

👮 Moderación
• /warn
• /unwarn
• /warnings
• /resetwarnings
• /silenciar
• /expulsar

🎭 Roles
• /rol
• /quitarrol

⚽ Liga
• /tabla
• /partidos

🎮 Diversión
• /8ball
• /dado
• /moneda

📊 Actividad
• /ranking
• /stats
`;

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: menu
            }
        );
    }
}
