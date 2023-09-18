import { check, ValidationChain } from 'express-validator';

const createSaleRequestValidation: ValidationChain[] = [
  check('clientId')
    .notEmpty()
    .withMessage("Property 'client id' cannot be empty.")
    .isString(),

  check('itensSale')
    .notEmpty()
    .withMessage("Property 'items' cannot be empty.")
];

const findSaleRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isUUID()
    .withMessage("Property 'id' must be a valid UUID.")
];

const updateSaleRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isUUID()
    .withMessage("Property 'id' must be a valid UUID."),
  check('clientId')
    .optional()
    .isString()
    .withMessage("Property 'client id' cannot be empty.")
];

const deleteSaleRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isUUID()
    .withMessage("Property 'id' must be a valid UUID.")
];

export {
  createSaleRequestValidation,
  findSaleRequestValidations,
  updateSaleRequestValidations,
  deleteSaleRequestValidations
};
