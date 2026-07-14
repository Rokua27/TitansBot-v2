const config = require("./system/config")

const {
    cargarJSON,
    guardarJSON
} = require("./utils/utils")

console.log("================================")
console.log(`🤖 ${config.nombreBot}`)
console.log(`📦 Versión: ${config.version}`)
console.log(`🏆 Comunidad: ${config.comunidad}`)
console.log("================================")
