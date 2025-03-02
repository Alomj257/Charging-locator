const Joi = require("joi");

const chargingPointSchema = Joi.object({
  postcode: Joi.string().min(4).max(20).required(),
  power_level: Joi.string().min(1).max(50).required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  address: Joi.string().min(5).max(255).required(),
});

module.exports = chargingPointSchema;
