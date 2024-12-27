const Joi = require("joi");

const getPartialSchema = (item, schema) =>
  Joi.object(
    Object.keys(item).reduce((acc, key) => {
      acc[key] = schema.extract(key);
      return acc;
    }, {})
  );

module.exports = {
  getPartialSchema,
};
