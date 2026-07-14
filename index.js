const http = require("http")
const QRCode = require("qrcode")
const pino = require("pino")

const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("@whiskeysockets/baileys")
const config = require("./systems/config")

const {
    cargarJSON,
    guardarJSON
} = require("./utils/utils")

console.log("================================")
console.log(`🤖 ${config.nombreBot}`)
console.log(`📦 Versión: ${config.version}`)
console.log(`🏆 Comunidad: ${config.comunidad}`)
console.log("================================")

// =============================
// BASES DE DATOS
// =============================

const roles = cargarJSON(
    "./data/roles.json",
    {}
)

const advertencias = cargarJSON(
    "./data/advertencias.json",
    {}
)

const actividad = cargarJSON(
    "./data/actividad.json",
    {}
)

const silenciados = cargarJSON(
    "./data/silenciados.json",
    {}
)

const logs = cargarJSON(
    "./data/logs.json",
    []
)

// =============================
// VARIABLES GLOBALES
// =============================

const PORT = process.env.PORT || 10000

let qrImage = null

// =============================
// SERVIDOR WEB
// =============================

http.createServer((req, res) => {

    if (req.url === "/qr") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        })

        if (qrImage) {

            return res.end(`
                <html>
                    <body style="font-family:Arial;text-align:center;padding-top:40px;">
                        <h1>Escanea este QR</h1>
                        <img src="${qrImage}" width="350"/>
                    </body>
                </html>
            `)
        }

        return res.end(`
            <html>
                <body style="font-family:Arial;text-align:center;padding-top:40px;">
                    <h1>✅ Bot conectado correctamente</h1>
                </body>
            </html>
        `)
    }

    res.end("TitansBot V2 activo")

}).listen(PORT, () => {

    console.log(`🌐 Servidor iniciado en puerto ${PORT}`)

})

// =============================
// INICIAR BOT
// =============================

async function iniciarBot() {

    const { state, saveCreds } =
        await useMultiFileAuthState("./auth")

    const { version } =
        await fetchLatestBaileysVersion()

    const sock = makeWASocket({

        version,

        auth: state,

        logger: pino({
            level: "silent"
        }),

        printQRInTerminal: false
    })

    sock.ev.on(
        "creds.update",
        saveCreds
    )

    sock.ev.on(
        "connection.update",
        async (update) => {

            const {
                connection,
                qr,
                lastDisconnect
            } = update

            if (qr) {

                qrImage =
                    await QRCode.toDataURL(qr)

                console.log("")
                console.log("================================")
                console.log("📱 QR generado correctamente")
                console.log("Abre:")
                console.log("https://titansbot-v2-1.onrender.com/qr")
                console.log("================================")
                
            }

            if (connection === "open") {

                console.log(
                    "✅ WhatsApp conectado correctamente"
                )

                qrImage = null
            }

            if (connection === "close") {

                const reason =
                    lastDisconnect?.error?.output?.statusCode

                console.log(
                    "❌ Conexión cerrada:",
                    reason
                )

                if (
                    reason !==
                    DisconnectReason.loggedOut
                ) {

                    setTimeout(() => {
                        iniciarBot()
                    }, 5000)
                }
            }
        }
    )
} 

iniciarBot()
