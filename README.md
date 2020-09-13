# joi-piece-validator

- Helps you validate part of the schema.

## Installation

```shell
npm install --save joi-piece-validator
```

## Importing

```js
import validateJoiPieces from 'joi-piece-validator'; // ES6
var validateJoiPieces = require('joi-piece-validator'); // ES5 with npm
```

## Requirements
```@hapi/joi```

use same @hapi/joi version

## Usage

### Validate

```js
const Joi = require("@hapi/joi")
const { validateJoiPieces } = require('joi-piece-validator')

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
const { error } = validateJoiPieces(joiSchema, pieces)
console.log(error)
```

### Validate params using validateParams middleware

```js
const Joi = require("@hapi/joi")
const { validateParams } = require('joi-piece-validator')

const joiSchema = {
    keyword: Joi.string()
        .max(50)
        .required(),
    place_type: Joi.string()
        .max(50)
        .required()
}

//Example of requesting url: http://localhost:3000/api/places/tokyo/region
//This will validate values of params (keyword and place_type)
route.get('/:keyword/:place_type', validateParams(joiSchema), async(req, res, next) => {
    ... await
})
```

### Validate query using validateQuery middleware

```js
const Joi = require("@hapi/joi")
const { validateQuery } = require('joi-piece-validator')

const joiSchema = {
    keyword: Joi.string()
        .max(50)
        .required(),
    place_type: Joi.string()
        .max(50)
        .required()
}

//Example of requesting url: http://localhost:3000/api/places?keyword=tokyo&place_type=region
//This will validate values of query (keyword and place_type)
route.get('/', validateQuery(joiSchema), async(req, res, next) => {
    ... await
})
```

### Validate body using validateBody middleware

```js
const Joi = require("@hapi/joi")
const { validateBody } = require('joi-piece-validator')

const joiSchema = {
    keyword: Joi.string()
        .max(50)
        .required(),
    place_type: Joi.string()
        .max(50)
        .required()
}

route.get('/', validateBody(joiSchema), async(req, res, next) => {
    ... await
})
```
