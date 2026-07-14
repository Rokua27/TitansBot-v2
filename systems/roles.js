const {
    cargarJSON,
    guardarJSON
} = require("./config")

const archivo = "./data/roles.json"

let roles = cargarJSON(archivo)

function obtenerRol(usuario) {
    return roles[usuario] || "usuario"
}

function asignarRol(usuario, rol) {
    roles[usuario] = rol
    guardarJSON(archivo, roles)
}

function eliminarRol(usuario) {
    delete roles[usuario]
    guardarJSON(archivo, roles)
}

module.exports = {
    obtenerRol,
    asignarRol,
    eliminarRol,
    roles
}
