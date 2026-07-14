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
