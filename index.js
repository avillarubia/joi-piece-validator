const Joi = require("@hapi/joi")

module.exports = (schema, { ...pieces }) => {
    const keys = Object.keys(pieces)
    const _schema = { ...schema }

    const schemaPieces = {}
    for (const key of keys) {
        schemaPieces[key] = _schema[key]
    }

    const isValid = Joi.object(schemaPieces).validate(pieces)
    return isValid
}