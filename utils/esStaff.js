const {
    cargarJSON
} = require("./utils")

module.exports = (
    usuario
) => {

    const staff =
        cargarJSON(
            "./data/staffLiga.json",
            []
        )

    return staff.includes(
        usuario
    )
}
