import { check, ValidationChain } from 'express-validator';

const registerUserRequestValidation: ValidationChain[] = [
  check('name')
    .notEmpty()
    .withMessage("Property 'name' cannot be empty.")
    .isString()
    .isLength({ min: 3 }),

  check('password')
    .notEmpty()
    .withMessage("Property 'password' cannot be empty.")
    .isString()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  check('confirm_password')
    .notEmpty()
    .withMessage("Property 'confirm_password' cannot be empty.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

const loginUserRequestValidation: ValidationChain[] = [
  check('email').notEmpty().withMessage("Property 'email' cannot be empty."),

  check('password')
    .notEmpty()
    .withMessage("Property 'password' cannot be empty.")
    .isString()
];

export { registerUserRequestValidation, loginUserRequestValidation };
