const config =
    require("../systems/config")

module.exports = (
    usuario
) => {

    const owner =
        config.owner
            .replace(/\D/g, "")

    const numero =
        usuario
            .split("@")[0]

    return owner === numero
}
