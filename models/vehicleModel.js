const Joi = require("joi");

const vehicleSchema = Joi.object({
  make_model: Joi.string().min(2).max(100).required(),
  battery_range: Joi.number().positive().required(),
  charging_time: Joi.number().positive().required(),
  vehicle_cost: Joi.number().positive().required(),
  top_speed: Joi.number().positive().required(),
  vehicle_image: Joi.string().uri().optional(),
});

module.exports = vehicleSchema;
