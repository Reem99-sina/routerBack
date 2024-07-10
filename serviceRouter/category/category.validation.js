const Joi = require("joi");

module.exports.validateaddCategory = {
    body:Joi.object().keys({
        name:Joi.string().required(),
        lists:Joi.array().items(Joi.string()).optional(),
        tasks:Joi.array().items(Joi.string()).optional()
    })
}