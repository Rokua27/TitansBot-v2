const fs = require("fs")
const path = require("path")

function cargarComandos() {

    const comandos = new Map()

    const categorias =
        fs.readdirSync("./commands")

    for (const categoria of categorias) {

        const rutaCategoria =
            path.join(
                "./commands",
                categoria
            )

        const archivos =
            fs.readdirSync(rutaCategoria)
            .filter(
                archivo =>
                    archivo.endsWith(".js")
            )

        for (const archivo of archivos) {

            const comando =
                require(
                    "../commands/" +
                    categoria +
                    "/" +
                    archivo
                )

            comandos.set(
                comando.nombre,
                comando
            )

            console.log(
                `✅ Cargado: ${comando.nombre}`
            )
        }
    }

    return comandos
}

module.exports = cargarComandos
