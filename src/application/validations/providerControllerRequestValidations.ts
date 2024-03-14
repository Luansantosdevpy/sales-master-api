import { check, ValidationChain } from 'express-validator';

const createProviderRequestValidation: ValidationChain[] = [
  check('name')
    .notEmpty()
    .withMessage("Property 'name' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),

  check('cnpj').notEmpty().withMessage("Property 'cnpj' cannot be empty."),

  check('postal_code')
    .notEmpty()
    .withMessage("Property 'phone postal_code' cannot be empty.")
    .isString(),

  check('corporate_name')
    .notEmpty()
    .withMessage("Property 'corporate_name' cannot be empty.")
    .isString()
];

const findProviderRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

const updateProviderRequestValidations: ValidationChain[] = [
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

  check('cnpj').notEmpty().withMessage("Property 'cnpj' cannot be empty."),

  check('postal_code')
    .notEmpty()
    .withMessage("Property 'phone postal_code' cannot be empty.")
    .isString(),

  check('corporate_name')
    .notEmpty()
    .withMessage("Property 'corporate_name' cannot be empty.")
    .isString()
];

const deleteProviderRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

export {
  createProviderRequestValidation,
  findProviderRequestValidations,
  updateProviderRequestValidations,
  deleteProviderRequestValidations
};
