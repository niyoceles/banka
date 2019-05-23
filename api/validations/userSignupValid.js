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

const phoneNumber = joi.number()
  .required()
  .label('Phone number must a number and required');

const userName = joi.string()
  .regex(/^[a-zA-Z]{5,10}$/)
  .required()
  .label('Username should be required and at least 5 to 10 characters.');

const password = joi.string()
  .min(8)
  .regex(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
  .required()
  .label('At least one uppercase and lowercase letter, one digit, and special character required for valid password');

const userSchema = joi.object().keys({
  firstName: name,
  lastName: name,
  email: email,
  phone: phoneNumber,
  userName: userName,
  password: password,
  location: name,
});

export default () => {
  const validationOptions = {
    abortEarly: true, // Abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    //stripUnkown: true // remove unknown keys from the validated data
  }

  // return the validation middleware
  return (req, res, next) => {
    return joi.validate(req.body, userSchema, validationOptions, (err, data) => {
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
