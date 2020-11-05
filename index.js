const Joi = require("@hapi/joi")

const validateJoiPieces = (schema, { ...pieces }) => {
    const schemaPieces = extractSchemaPieces(schema, pieces)
    const validatedObj = Joi.object(schemaPieces).validate(pieces)

    return validatedObj
}

const validateBody = (schema, selectively = false) => {
    return (req, res, next) => {
        const { body } = req

        if (!body)
            return res.send('No provided body.').status(400)

        let _schema = schema

        if (selectively)
            _schema = extractSchemaPieces(schema, body)

        const error = validate(_schema, body)

        if (error)
            return res.send(error.details[0].message).status(400)

        next()
    }
}

const validateQueries = (schema) => {
    return (req, res, next) => {
        const { query } = req

        if (!query)
            return res.send('No provided queries.').status(400)

        const schemaPieces = extractSchemaPieces(schema, query)
        const error = validate(schemaPieces, query)

        if (error)
            return res.send(error.details[0].message).status(400)

        next()
    }
}

const validateParams = (schema) => {
    return (req, res, next) => {
        const { params } = req

        if (!params)
            return res.send('No provided parameters.').status(400)

        const schemaPieces = extractSchemaPieces(schema, params)
        const error = validate(schemaPieces, params)

        if (error)
            return res.send(error.details[0].message).status(400)

        next()
    }
}

function extractSchemaPieces(schema, pieces) {
    const keys = Object.keys(pieces)
    const _schema = { ...schema }

    const schemaPieces = {}
    for (const key of keys) {
        schemaPieces[key] = _schema[key]
    }

    return schemaPieces
}

function validate(schema, objectToValidate) {
    const { error } = Joi.object(schema).validate(objectToValidate)
    return error
}

module.exports = {
    validateJoiPieces,
    validateBody,
    validateQueries,
    validateParams,
}