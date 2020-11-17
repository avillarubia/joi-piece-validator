# joi-piece-validator

- Helps you validate part of the schema.
- For middleware function will return the validation error inside the response

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
```joi```

use same joi version

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

### Validate req.params using validateParams middleware

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

//will return the validation error inside response
```

### Validate req.query using validateQuery middleware

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

//will return the validation error inside response
```

### Validate req.body using validateBody middleware

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

//validateBody(joiSchema, selectively=false)
//selectively=false is the default value
//will validate all items in req.body
route.get('/', validateBody(joiSchema), async(req, res, next) => {
    ... await
})

//validateBody(joiSchema, selectively=true)
//will only use schema items based on the items from req.body
//validate only req.body items that found inside the schema
route.get('/', validateBody(joiSchema, true), async(req, res, next) => {
    ... await
})

//will return the validation error inside response
```
