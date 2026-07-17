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

const cargarComandos =
    require(
        "./utils/cargarComandos"
    )

const esAdmin =
    require(
        "./utils/esAdmin"
    )

 const esOwner =
    require("./utils/esOwner")

const esStaff =
    require("./utils/esStaff")

console.log("================================")
console.log(`🤖 ${config.nombreBot}`)
console.log(`📦 Versión: ${config.version}`)
console.log(`🏆 Comunidad: ${config.comunidad}`)
console.log("================================")
const comandos =
    cargarComandos()

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
    
console.log("Ruta auth cargada correctamente")
    
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
    "creds.update",
    saveCreds
)
    
sock.ev.on(
    "messages.upsert",
    async ({ messages }) => {

        try {

            const mensaje = messages[0]

            if (!mensaje.message)
                return

const texto =
    mensaje.message.conversation ||
    mensaje.message.extendedTextMessage?.text ||
    ""

console.log("================================")
console.log("MENSAJE RECIBIDO")
console.log("CHAT:", mensaje.key.remoteJid)
console.log("TEXTO:", texto)
console.log("================================")

const usuario =
    mensaje.key.participant ||
    mensaje.key.remoteJid

actividad[usuario] =
    (actividad[usuario] || 0) + 1

guardarJSON(
    "./data/actividad.json",
    actividad
)
      // ======================
      // TITANS IA AUTOMÁTICA
      // ======================

if (
    texto.toLowerCase().startsWith("titans ")
) {

    const ia =
        require(
            "./commands/general/ia"
        )

    const pregunta =
        texto
            .slice(7)
            .trim()
            .split(" ")

    return await ia.ejecutar(
        sock,
        mensaje,
        pregunta
    )
} 
        
        if (!texto.startsWith(config.prefijo))
            return

        const args =
            texto.slice(
                config.prefijo.length
            ).trim().split(" ")

        const comandoNombre =
            args.shift().toLowerCase()

        const comando =
            comandos.get(
                comandoNombre
            )

if (!comando)
    return

// =============================
// PERMISOS ADMIN
// =============================

if (comando.admin === true) {

    const admin =
        await esAdmin(
            sock,
            mensaje.key.remoteJid,
            usuario
        )

    if (!admin) {

        return await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`⛔ COMANDO RESTRINGIDO

Solo los administradores del grupo pueden utilizar este comando.`
            }
        )
    }
}
  
  // =============================
// PERMISOS OWNER
// =============================

if (comando.owner === true) {

    const owner =
        esOwner(usuario)

    if (!owner) {

        return await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`👑 COMANDO EXCLUSIVO DEL OWNER

Solo el propietario del bot puede utilizar este comando.`
            }
        )
    }
}      

// =============================
// PERMISOS STAFF LIGA
// =============================

if (comando.staff === true) {

    const staff =
        esStaff(usuario)

    const admin =
        await esAdmin(
            sock,
            mensaje.key.remoteJid,
            usuario
        )

    const owner =
        esOwner(usuario)

    if (
        !staff &&
        !admin &&
        !owner
    ) {

        return await sock.sendMessage(
            mensaje.key.remoteJid,
            {
                text:
`🏆 COMANDO EXCLUSIVO STAFF LIGA

Solo el Staff Liga, administradores o el Owner pueden usar este comando.`
            }
        )
    }
}
        
        try {

            await comando.ejecutar(
                sock,
                mensaje,
                args
            )

        } catch (error) {

            console.log(
                "ERROR EN MESSAGES.UPSERT"
            )

            console.log(error)

            try {

                await sock.sendMessage(
                    mensaje.key.remoteJid,
                    {
                        text:
                        "❌ Error ejecutando comando."
                    }
                )

            } catch {}
        }
    }
)
 sock.ev.on(
    "group-participants.update",
    async (data) => {

        const {
            cargarJSON
        } = require("./utils/utils")

        const config =
            cargarJSON(
                "./data/configGrupo.json",
                {
                    welcome: true,
                    bye: true
                }
            )

        const grupo =
            data.id

        const participante =
            data.participants[0]

        // BIENVENIDA
        if (
    data.action === "add" &&
    config.welcome
) {

    await sock.sendMessage(
        grupo,
        {
            text:
`⚔════════════════════⚔
        👋 ¡BIENVENIDO!
⚔════════════════════⚔

🎮 Jugador:
@${participante.split("@")[0]}

🏆 Bienvenido a
*LIGA TITANS TEAM*

🔥 El campo de batalla te espera.

👑 Demuestra tu habilidad.
⭐ Gana tus MVP.
🏆 Lleva a tu escuadra a la gloria.

📌 Comandos importantes:
➤ /menu
➤ /tabla
➤ /equipos
➤ /batallas

⚔ ¡DONDE NACEN LAS LEYENDAS!
⚔════════════════════⚔`,
            mentions: [participante]
        }
    )
        }

        // DESPEDIDA
        if (
    data.action === "remove" &&
    config.bye
) {

    await sock.sendMessage(
        grupo,
        {
            text:
`⚔════════════════════⚔
      🚪 UN GUERRERO PARTE
⚔════════════════════⚔

👤 @${participante.split("@")[0]}

🏆 Abandona la Liga Titans Team.

⚔ Sus batallas quedarán
grabadas en nuestra historia.

🔥 Que la grieta ilumine
tu próximo destino.

Hasta la próxima temporada.

⚔════════════════════⚔`,
            mentions: [participante]
        }
    )
        }
    }
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

    console.log(
        "📱 Número conectado:",
        sock.user.id
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
