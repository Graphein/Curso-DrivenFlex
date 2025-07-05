const Joi = require('joi');

const validateTransaction = (req, res, next) => {
  const schema = Joi.object({
    value: Joi.number().positive().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('deposit', 'withdraw').required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details[0].message });
  next();
};

module.exports = validateTransaction;