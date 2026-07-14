const fs = require("fs")
const path = require("path")

function cargarComandos() {

    const comandos = {}

    const carpetas =
        fs.readdirSync("./commands")

    for (const carpeta of carpetas) {

        const archivos =
            fs.readdirSync(
                `./commands/${carpeta}`
            )

        for (const archivo of archivos) {

            if (!archivo.endsWith(".js"))
                continue

            const comando =
                require(
                    path.join(
                        process.cwd(),
                        "commands",
                        carpeta,
                        archivo
                    )
                )

            comandos[
                comando.nombre
            ] = comando
        }
    }

    return comandos
}

module.exports = {
    cargarComandos
}
