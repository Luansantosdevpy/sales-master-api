import { check, ValidationChain } from 'express-validator';

const createCategoryRequestValidation: ValidationChain[] = [
  check('category_name')
    .notEmpty()
    .withMessage("Property 'name' cannot be empty.")
    .isString()
    .isLength({ min: 3 })
];

const findCategoryRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isUUID()
    .withMessage("Property 'id' must be a valid UUID.")
];

const updateCategoryRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isUUID()
    .withMessage("Property 'id' must be a valid UUID."),
  check('category_name')
    .optional()
    .isString()
    .withMessage("Property 'name' cannot be empty.")
    .isLength({ min: 3 })
    .withMessage("Property 'name' must be greater than 3 characters.")
];

const deleteCategoryRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isUUID()
    .withMessage("Property 'id' must be a valid UUID.")
];

export {
  createCategoryRequestValidation,
  findCategoryRequestValidations,
  updateCategoryRequestValidations,
  deleteCategoryRequestValidations
};
