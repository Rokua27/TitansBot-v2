module.exports = {
    nombre: "ping",

    descripcion: "Comprueba si el bot está funcionando",

    ejecutar: async (sock, mensaje) => {

        await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text: "🏓 Pong\n\n✅ TitansBot V2 funcionando correctamente."
            }
        )

    }
}
