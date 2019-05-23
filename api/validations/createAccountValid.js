import joi from 'joi';

const name = joi.string()
  .regex(/^[A-Za-z]+$/)
  .lowercase()
  .required()
  .label('Only alphabetic characters are allowed');

const email = joi.string()
  .email({ minDomainAtoms: 2 })
  .lowercase()
  .required()
  .label('Valid Email Address is required');

const phoneNumber = joi.string()
  .regex(/^[0-9]{10,12}$/)
  .required()
  .label('Phone number must be required and at least 10 number or 12.');

const number = joi.string()
  .required()
  .regex(/^[1-9]+\d*$/)
  .label(' must be required and a positive number');

const accountSchema = joi.object().keys({
  type: name,
  email: email,
  phone: phoneNumber,
  balance: number,
});

export default () => {
  const validationOptions = {
    abortEarly: true, // Abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    //stripUnkown: true // remove unknown keys from the validated data
  }

  // return the validation middleware
  return (req, res, next) => {
    return joi.validate(req.body, accountSchema, validationOptions, (err, data) => {
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
