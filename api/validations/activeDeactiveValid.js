import joi from 'joi';

const wordActive = joi.string()
  // .regex(/[active]+$/)
  .lowercase()
  .required()
  .label('Only alphabetic active or deactive');

const userSchema = joi.object().keys({
  status: wordActive,
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
