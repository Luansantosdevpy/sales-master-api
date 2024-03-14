import { check, ValidationChain } from 'express-validator';

const createProductRequestValidation: ValidationChain[] = [
  check('name')
    .notEmpty()
    .withMessage("Property 'name' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),

  check('price').notEmpty().withMessage("Property 'price' cannot be empty."),

  check('attributes')
    .notEmpty()
    .withMessage("Property 'attributes' cannot be empty.")
    .isString()
];

const findProductRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

const updateProductRequestValidations: ValidationChain[] = [
  check('name')
    .notEmpty()
    .withMessage("Property 'name' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),

  check('price').notEmpty().withMessage("Property 'price' cannot be empty."),

  check('sku')
    .notEmpty()
    .withMessage("Property 'phone sku' cannot be empty.")
    .isString(),

  check('categoryId')
    .notEmpty()
    .withMessage("Property 'categoryId' cannot be empty.")
    .isString(),

  check('attributes')
    .notEmpty()
    .withMessage("Property 'attributes' cannot be empty.")
    .isString()
];

const deleteProductRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

export {
  createProductRequestValidation,
  findProductRequestValidations,
  updateProductRequestValidations,
  deleteProductRequestValidations
};
