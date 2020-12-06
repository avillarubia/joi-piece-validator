const Joi = require('joi')

const validateJoiPieces = (schema, { ...pieces }) => {
    const schemaPieces = extractSchemaPieces(schema, pieces)
    const validatedObj = Joi.object(schemaPieces).validate(pieces)

    return validatedObj
}

const validateBody = (schema, selectively = false) => {
    return (req, res, next) => {
        const { body } = req

        if (!body)
            return res.status(400).send('No provided body.')

        let _schema = schema

        if (selectively)
            _schema = extractSchemaPieces(schema, body)

        const error = validate(_schema, body)

        if (error)
            return res.status(400).send(error.details[0].message)

        next()
    }
}

const validateQueries = (schema) => {
    return (req, res, next) => {
        const { query } = req

        if (!query)
            return res.status(400).send('No provided queries.')

        const schemaPieces = extractSchemaPieces(schema, query)
        const error = validate(schemaPieces, query)

        if (error)
            return res.status(400).send(error.details[0].message)

        next()
    }
}

const validateParams = (schema) => {
    return (req, res, next) => {
        const { params } = req

        if (!params)
            return res.status(400).send('No provided parameters.')

        const schemaPieces = extractSchemaPieces(schema, params)
        const error = validate(schemaPieces, params)

        if (error)
            return res.status(400).send(error.details[0].message)

        next()
    }
}

function extractSchemaPieces(schema, pieces) {
    const keys = Object.keys(pieces)
    const _schema = { ...schema }

    const schemaPieces = {}
    for (const key of keys) {
        if (!_schema[key]) {
            schemaPieces[key] = _schema[key]
        }
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