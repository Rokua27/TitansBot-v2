module.exports = {

    nombre: "menu",

    ejecutar: async (
        sock,
        msg
    ) => {

        const menu = `
╔══════════════════════╗
║      🤖 TITANSBOT V2      ║
║ ⚔️  LIGA TITANS TEAMS  ⚔️ ║
╚══════════════════════╝

🏆 Liga Titans Teams
📦 Versión: 2.0.0
👑 Prefijo: /

━━━━━━━━━━━━━━━━━━━━━━
📌 COMANDOS DISPONIBLES
━━━━━━━━━━━━━━━━━━━━━━

╭━━━〔 🌐 GENERAL 〕━━━╮
┃ ⚡ /ping
┃ 📖 /menu
╰━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🛡 MODERACIÓN 〕━━━╮
┃ ⚠️ /warn
┃ ♻️ /unwarn
┃ 📋 /warnings
┃ 🔇 /mute
┃ 🔊 /unmute
┃ 📜 /mutelist
╰━━━━━━━━━━━━━━━━━━╯

╭━━━〔 👑 ROLES Y STAFF 〕━━━╮
┃ 🏅 /rol
┃ 👑 /capitan
╰━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🏆 LIGA TITANS TEAMS 〕━━━╮
┃ 🏟 /addequipo
┃ 🏟 /equipos
┃ ❌ /removeequipo
┃ 👤 /addjugador
┃ 👤 /jugador
┃ 👥 /jugadores
┃ 📋 /perfil
┃ 🧾 /roster
┃ ⚔️ /batalla
┃ 📚 /batallas
┃ 🏆 /resultado
┃ 📊 /tabla
┃ 📜 /historial
┃ ⭐ /mvp
┃ 🌟 /mvps
┃ 🥇 /topmvp
┃ 🔄 /transferir
╰━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🎲 DIVERSIÓN 〕━━━╮
┃ 🎱 /8ball
┃ 🎲 /dado
┃ 🪙 /moneda
╰━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📈 ACTIVIDAD 〕━━━╮
┃ 📊 /actividad
┃ 🏅 /ranking
┃ 📈 /stats
╰━━━━━━━━━━━━━━━━━━╯

━━━━━━━━━━━━━━━━━━━━━━
🏆 TITANSBOT V2
⚔️ Built for MLBB Communities
👑 "Donde nacen las leyendas"
━━━━━━━━━━━━━━━━━━━━━━
`

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: menu
            }
        );
    }
}
