const Joi = require("joi");

const createUpdateSchema = Joi.object({
  question: Joi.string().required().max(255).messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} cannot be empty",
    "string.max":
      "{#label} must be less than or equal to {limit} characters long",
    "any.required": "{#label} is required",
  }),
  solution: Joi.string().required().messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} cannot be empty",
    "any.required": "{#label} is required",
  }),
  correctAnswer: Joi.string().required().messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} cannot be empty",
    "any.required": "{#label} is required",
  }),
  options: Joi.array()
    .required()
    .items(
      Joi.object({
        orderNumber: Joi.number().integer().min(1).required().messages({
          "number.base": "{#label} must be a number",
          "number.integer": "{#label} must be an integer",
          "number.min": "{#label} must be greater than or equal to 1",
          "any.required": "{#label} is required",
        }),
        value: Joi.string().required().messages({
          "string.base": "{#label} must be a string",
          "string.empty": "{#label} cannot be empty",
          "any.required": "{#label} is required",
        }),
      })
    )
    .messages({
      "array.base": "{#label} must be an array",
      "array.empty": "{#label} cannot be empty",
      "array.required": "{#label} is required",
    }),
  steps: Joi.array()
    .required()
    .items(
      Joi.object({
        orderNumber: Joi.number().integer().min(1).required().messages({
          "number.base": "{#label} must be a number",
          "number.integer": "{#label} must be an integer",
          "number.min": "{#label} must be greater than or equal to 1",
          "any.required": "{#label} is required",
        }),
        title: Joi.string().required().messages({
          "string.base": "{#label} must be a string",
          "string.empty": "{#label} cannot be empty",
          "any.required": "{#label} is required",
        }),
        result: Joi.string().required().messages({
          "string.base": "{#label} must be a string",
          "string.empty": "{#label} cannot be empty",
          "any.required": "{#label} is required",
        }),
        imgUrl: Joi.string().optional().messages({
          "string.base": "{#label} must be a string",
          "string.empty": "{#label} cannot be empty",
          "any.required": "{#label} is required",
        }),
      })
    )
    .messages({
      "array.base": "{#label} must be an array",
      "array.empty": "{#label} cannot be empty",
      "array.required": "{#label} is required",
    }),
  imgUrl: Joi.string().optional().messages({
    "string.base": "{#label} must be a string",
    "string.empty": "{#label} cannot be empty",
    "any.required": "{#label} is required",
  }),
  tags: Joi.array().required().items(Joi.string().required()).messages({
    "array.base": "{#label} must be an array",
    "array.empty": "{#label} cannot be empty",
    "array.required": "{#label} is required",
    "any.required": "{#label} must be a string",
  }),
}).unknown(false);

const deleteMultipleSchema = Joi.object({
  ids: Joi.array().items(Joi.string().required()).required().messages({
    "array.base": "ids must be an array",
    "array.empty": "ids cannot be empty",
    "array.required": "ids are required",
    "string.base": "Each id must be a string",
    "string.empty": "id cannot be empty",
  }),
});

module.exports = {
  createUpdateSchema,
  deleteMultipleSchema,
};
