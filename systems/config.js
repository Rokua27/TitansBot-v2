const fs = require("fs")

function cargarJSON(ruta, valorPorDefecto = {}) {
    if (!fs.existsSync(ruta)) {
        fs.writeFileSync(
            ruta,
            JSON.stringify(valorPorDefecto, null, 2)
        )
    }

    return JSON.parse(
        fs.readFileSync(ruta)
    )
}

function guardarJSON(ruta, datos) {
    fs.writeFileSync(
        ruta,
        JSON.stringify(datos, null, 2)
    )
}

module.exports = {
    cargarJSON,
    guardarJSON
}
