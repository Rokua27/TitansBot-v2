const {
    cargarJSON,
    guardarJSON
} = require("../../utils/utils")

module.exports = {

    nombre: "warn",

    ejecutar: async (
        sock,
        mensaje,
        args
    ) => {

        const usuario =
            mensaje.message.extendedTextMessage
            ?.contextInfo
            ?.mentionedJid?.[0]

        if (!usuario) {

            return await sock.sendMessage(
                mensaje.key.remoteJid,
                {
                    text:
                        "❌ Debes mencionar a un usuario.\n\nEjemplo:\n/warn @usuario spam"
                }
            )
        }

        const motivo =
            args.slice(1).join(" ") ||
            "Sin motivo"

        const advertencias =
            cargarJSON(
                "./data/advertencias.json",
                {}
            )

        if (!advertencias[usuario]) {

            advertencias[usuario] = 0
        }

        advertencias[usuario]++

        guardarJSON(
            "./data/advertencias.json",
            advertencias
        )

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`⚠️ Advertencia registrada

👤 Usuario:
@${usuario.split("@")[0]}

📝 Motivo:
${motivo}

📊 Advertencias:
${advertencias[usuario]}/10`,
                mentions: [usuario]
            }
        )
    }
}
