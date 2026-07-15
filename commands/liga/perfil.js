const {
    cargarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "perfil",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const nombreJugador =
            args.join(" ")

        if (!nombreJugador) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
`❌ Uso correcto:

/perfil Kelra`
                }
            )
        }

        const liga =
            cargarJSON(
                "./data/liga.json",
                {
                    jugadores: {},
                    equipos: {}
                }
            )

        const jugador =
            liga.jugadores[nombreJugador]

        if (!jugador) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "❌ Jugador no encontrado."
                }
            )
        }

        const esCapitan =
            liga.equipos[
                jugador.equipo
            ]?.capitan === nombreJugador

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`━━━━━━━━━━━━━━
👤 PERFIL LIGA TITANS TEAMS
━━━━━━━━━━━━━━

🏷 Nombre:
${nombreJugador}

🏆 Escuadra:
${jugador.equipo}

🎮 Rol:
${jugador.rol || "Sin asignar"}

👑 Capitán:
${esCapitan ? "Sí" : "No"}

⭐ MVP:
${jugador.mvp || 0}

📈 Estado:
Activo

━━━━━━━━━━━━━━`
            }
        )
    }
}
