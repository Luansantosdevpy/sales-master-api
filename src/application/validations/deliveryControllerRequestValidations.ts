import { check, ValidationChain } from 'express-validator';

const createDeliveryRequestValidations: ValidationChain[] = [
  check('clientId')
    .notEmpty()
    .withMessage("Property 'ClientId' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string."),

  check('saleId')
    .notEmpty()
    .withMessage("Property 'saleId' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string."),

  check('total').notEmpty().withMessage("Property 'total' cannot be empty."),

  //check previsão de entrega

  check('payment')
    .notEmpty()
    .withMessage("Property 'payment' cannot be empty."),
  check('createdAt')
    .notEmpty()
    .withMessage("Property 'createdAt' cannot be empty."),
  check('updatedAt')
    .notEmpty()
    .withMessage("Property 'updatedAt' cannot be empty.")
];

const findDeliveryRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

const updatedStatusOfDeliveryRequestValidations: ValidationChain[] = [
    check('')
];

const deleteProductRequestValidations: ValidationChain[] = [
  check('id')
    .notEmpty()
    .withMessage("Property 'id' cannot be empty.")
    .isString()
    .withMessage("Property 'id' must be a valid string.")
];

export {
  createDeliveryRequestValidations,
  findDeliveryRequestValidations,
  deleteProductRequestValidations,
  updatedStatusOfDeliveryRequestValidations
};
