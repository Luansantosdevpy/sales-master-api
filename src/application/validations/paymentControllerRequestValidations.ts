import { check, ValidationChain } from 'express-validator';

const createPaymentRequestValidation: ValidationChain[] = [
  check('total')
    .notEmpty()
    .withMessage("Property 'total' cannot be empty.")
    .isNumeric(),

  check('payment_type')
    .notEmpty()
    .withMessage("Property 'payment_type' cannot be empty.")
];

const findPaymentRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

const updatePaymentRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string."),
  check('reasonOfCancel')
    .notEmpty()
    .withMessage("Property 'reasonOfCancel' cannot be empty.")
    .isString()
    .withMessage("Property 'reasonOfCancel' must be a valid string.")
];

export {
  createPaymentRequestValidation,
  findPaymentRequestValidations,
  updatePaymentRequestValidations
};
