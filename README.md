# joi-piece-validator

Validate part of the schema.

## Installation

```shell
npm install --save joi-piece-validator
```

## Importing

```js
import PropTypes from 'joi-piece-validator'; // ES6
var PropTypes = require('joi-piece-validator'); // ES5 with npm
```

## Requirements
```@hapi/joi: 16.1.8```

use same @hapi/joi version

## Usage

```js
const Joi = require("@hapi/joi")
const validateJoiPiece = require('joi-piece-validator')

//your schema
const joiSchema = {
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

//Only email and password to validate
const email = 'test@gmail.com'
const password = '1'
const pieces = { email, password }

//Pass the joi schema and the piece(s) to validate.
const { error } = validateJoiPiece(joiSchema, pieces)
console.log(error.details[0].message)
```