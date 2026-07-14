const http = require("http")
const QRCode = require("qrcode")
const pino = require("pino")

const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("@whiskeysockets/baileys")
const config = require("./system/config")

const {
    cargarJSON,
    guardarJSON
} = require("./utils/u detils")

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
