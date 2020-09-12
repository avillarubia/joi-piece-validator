const Joi = require("@hapi/joi")
const { validateJoiPieces } = require('../../index')

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
const confirm_password = '1'
const pieces = { email, confirm_password }

joiRegisterSchema['confirm_password'] = Joi.string()
    .min(5)
    .max(50)
    .required()

const { error } = validateJoiPieces(joiRegisterSchema, pieces)
console.log(error.details[0].message)