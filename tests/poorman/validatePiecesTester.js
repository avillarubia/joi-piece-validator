const Joi = require("@hapi/joi")
const { validateJoiPieces, validateBody } = require('../../index')

const joiRegisterSchema = {
    email: Joi.string()
        .min(5)
        .max(50)
        .required()
        .email()
        .trim(),
    password: Joi.string()
        .min(5)
        .max(50)
        .required(),
    first_name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .label('first name')
        .trim(),
    last_name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .label('last name')
        .trim()
}

const email = 'test@gmail.com'
const password = '1'
let pieces = { email, password }

let { error } = validateJoiPieces(joiRegisterSchema, pieces)
console.log(error.details[0].message)

pieces = { email, password, test: 'test' }
error = validateBody(joiRegisterSchema, pieces)
console.log(error.details[0].message)