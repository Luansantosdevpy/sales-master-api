import { check, ValidationChain } from 'express-validator';

const createClienteRequestValidation: ValidationChain[] = [
  check('name')
    .notEmpty()
    .withMessage("Property 'name' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),
  check('cpf')
    .notEmpty()
    .withMessage("Property 'cpf' cannot be empty.")
    .isString()
    .isLength({ min: 11 })
    .withMessage('Cpf must be at exactly 11 characters long'),
  check('email')
    .notEmpty()
    .withMessage("Property 'email' cannot be empty.")
    .isEmail(),
  check('phone_number')
    .notEmpty()
    .withMessage("Property 'phone number' cannot be empty.")
    .isString()
    .isLength({ min: 11 })
    .withMessage('phone number must be at exactly 11 characters long'),
  check('address')
    .notEmpty()
    .withMessage("Property 'address' cannot be empty.")
    .isString(),
  check('postal_code')
    .notEmpty()
    .withMessage("Property 'postal_code' cannot be empty.")
    .isString(),
  check('address_number')
    .notEmpty()
    .withMessage("Property 'address_number' cannot be empty.")
    .isNumeric(),
  check('province')
    .notEmpty()
    .withMessage("Property 'province' cannot be empty.")
    .isNumeric(),
  check('city')
    .notEmpty()
    .withMessage("Property 'city' cannot be empty.")
    .isNumeric(),
  check('uf')
    .notEmpty()
    .withMessage("Property 'uf' cannot be empty.")
    .isNumeric()
];

const findClientRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

const updateClientRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string."),
  check('name')
    .notEmpty()
    .withMessage("Property 'name' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),
  check('cpf')
    .notEmpty()
    .withMessage("Property 'cpf' cannot be empty.")
    .isString()
    .isLength({ min: 11 })
    .withMessage('Cpf must be at exactly 11 characters long'),
  check('email')
    .notEmpty()
    .withMessage("Property 'email' cannot be empty.")
    .isEmail(),
  check('phone_number')
    .notEmpty()
    .withMessage("Property 'phone number' cannot be empty.")
    .isString()
    .isLength({ min: 11 })
    .withMessage('phone number must be at exactly 11 characters long'),
  check('address')
    .notEmpty()
    .withMessage("Property 'address' cannot be empty.")
    .isString(),
  check('postal_code')
    .notEmpty()
    .withMessage("Property 'postal_code' cannot be empty.")
    .isString(),
  check('address_number')
    .notEmpty()
    .withMessage("Property 'address_number' cannot be empty.")
    .isNumeric(),
  check('province')
    .notEmpty()
    .withMessage("Property 'province' cannot be empty.")
    .isNumeric(),
  check('city')
    .notEmpty()
    .withMessage("Property 'city' cannot be empty.")
    .isNumeric(),
  check('uf')
    .notEmpty()
    .withMessage("Property 'uf' cannot be empty.")
    .isNumeric()
];

const deleteClientRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

export {
  createClienteRequestValidation,
  findClientRequestValidations,
  updateClientRequestValidations,
  deleteClientRequestValidations
};
