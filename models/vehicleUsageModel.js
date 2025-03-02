const Joi = require("joi");

const vehicleUsageSchema = Joi.object({
  make_model: Joi.string().min(2).max(100).required(),
  car_type: Joi.string().min(2).max(100).required(),
  distance_type: Joi.string().valid("Miles", "Kilometers").required(),
  fuel_efficiency: Joi.number().positive().required(),
  fuel_type: Joi.string().valid("Petrol", "Diesel", "Electric", "Hybrid").required(),
  fuel_cost: Joi.number().positive().required(),
  trip_label: Joi.string().min(2).max(100).optional(),
  trip_frequency: Joi.string().valid(
    "daily (5-7 days a week)",
    "weekly (1-4 days a week)",
    "monthly (1-3 days a month)"
  ).optional(),
  trip_distance: Joi.number().positive().optional()
});

module.exports = vehicleUsageSchema;
