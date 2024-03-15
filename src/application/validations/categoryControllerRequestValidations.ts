import { check, ValidationChain } from 'express-validator';

const createCategoryRequestValidation: ValidationChain[] = [
  check('category_name')
    .notEmpty()
    .withMessage("Property 'name' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),
  check('description')
    .notEmpty()
    .withMessage("Property 'description' cannot be empty.")
    .isString()
];

const findCategoryRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

const updateCategoryRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string."),
  check('category_name')
    .optional()
    .isString()
    .withMessage("Property 'category_name' cannot be empty.")
    .isLength({ min: 3 })
    .withMessage("Property 'category_name' must be greater than 3 characters."),
  check('description')
    .notEmpty()
    .withMessage("Property 'description' cannot be empty.")
    .isString()
];

const deleteCategoryRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

export {
  createCategoryRequestValidation,
  findCategoryRequestValidations,
  updateCategoryRequestValidations,
  deleteCategoryRequestValidations
};
