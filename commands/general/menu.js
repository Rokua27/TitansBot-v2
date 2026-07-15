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
• /mute
• /unmute
• /mutelist
• /kick
• /tagall
• /tagadmins
• /promote
• /demote

🎭 Roles
• /rol
• /quitarrol
• /roles

⚽ Liga
• /tabla
• /partidos

🎮 Diversión
• /8ball
• /dado
• /moneda

📊 Actividad
• /actividad
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
