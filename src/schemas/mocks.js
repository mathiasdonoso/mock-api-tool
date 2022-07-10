const Joi = require("joi");

const configSchema = Joi.object({
  response_time: Joi.number(),
});

const requestSchema = Joi.object({
  url: Joi.string().required(),
  headers: Joi.object(),
  query: Joi.object(),
  body: Joi.object(),
  method: Joi.string()
    .valid("options", "get", "post", "put", "patch", "delete")
    .required(),
});

const responseSchema = Joi.object({
  status: Joi.number().required(),
  headers: Joi.object(),
  body: Joi.array().items(Joi.object()).single(),
});

const caseSchema = Joi.object({
  config: configSchema,
  request: requestSchema.required(),
  response: responseSchema.required(),
});

const apiSchema = Joi.object({
  prefix: Joi.string(),
  config: configSchema,
  cases: Joi.array().items(caseSchema),
});

module.exports = apiSchema;
