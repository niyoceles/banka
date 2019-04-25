import joi from 'joi';
const allChar = joi.string()
  .regex(/^[A-Za-z0-9 ]+$/)
  .lowercase()
  .required()
  .label('Only alphabetic and number characters are allowed');

const number = joi.number()
  .required()
  .label(' must a number and required');

const transactionSchema = joi.object().keys({
  cashier: number,
  reason: allChar,
  amount: number,
});

export default () => {
  const validationOptions = {
    abortEarly: true, // Abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
  }
  // return the validation middleware
  return (req, res, next) => {
    return joi.validate(req.body, transactionSchema, validationOptions, (err, data) => {
      if (err) {
        const errors = [];
        err.details.map((e) => {
          errors.push({ field: e.path[0], message: e.message.replace(/"/g, '_').split('_')[1] });
        });

        const error = {
          status: 400,
          error: errors,
        };
        // Send back the JSON error response
        res.status(400).json(error);
      } else {
        // Replace req.body with the data after validation
        req.body = data;
        next();
      }
    });
  };
};
