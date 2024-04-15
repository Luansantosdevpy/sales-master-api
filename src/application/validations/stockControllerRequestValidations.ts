import { check, ValidationChain } from 'express-validator';

const createStockRequestValidation: ValidationChain[] = [
  check('productsName')
    .notEmpty()
    .withMessage("Property 'productsName' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),

  check('retailPrice')
    .notEmpty()
    .withMessage("Property 'retailPrice' cannot be empty."),

  check('description')
    .notEmpty()
    .withMessage("Property 'description' cannot be empty.")
    .isString(),

  check('quantityAvailable')
    .notEmpty()
    .withMessage("Property 'quantityAvailable' cannot be empty.")
    .isNumeric()
];

const findStockRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

const updateStockRequestValidations: ValidationChain[] = [
  check('productsName')
    .notEmpty()
    .withMessage("Property 'productsName' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),

  check('retailPrice')
    .notEmpty()
    .withMessage("Property 'retailPrice' cannot be empty."),

  check('quantityAvailable')
    .notEmpty()
    .withMessage("Property 'quantityAvailable' cannot be empty."),

  check('productId')
    .notEmpty()
    .withMessage("Property 'productId' cannot be empty.")
    .isString()
];

const updateStockQuantityRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string."),

  check('quantity')
    .notEmpty()
    .withMessage("Property 'quantity' cannot be empty.")
];

const deleteStockRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

export {
  createStockRequestValidation,
  findStockRequestValidations,
  updateStockRequestValidations,
  updateStockQuantityRequestValidations,
  deleteStockRequestValidations
};
