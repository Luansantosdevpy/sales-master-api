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

  check('phone_number')
    .notEmpty()
    .withMessage("Property 'phone number' cannot be empty.")
    .isString()
    .isLength({ min: 11 })
    .withMessage('phone number must be at exactly 11 characters long')
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
    .optional()
    .isString()
    .withMessage("Property 'name' cannot be empty.")
    .isLength({ min: 3 })
    .withMessage("Property 'name' must be greater than 3 characters.")
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
