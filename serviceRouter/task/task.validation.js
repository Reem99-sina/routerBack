const Joi = require("joi");

module.exports.validateaddTask = {
    body: Joi.object().required().keys({
        tasks:Joi.array().items(Joi.object().keys({
            body:Joi.string()
        })).optional(),
        task:Joi.string().optional(),
        isShare:Joi.boolean().required(),
        isList:Joi.boolean().required()
    })
}
module.exports.validateupdateTask = {
    params: Joi.object().required().keys({
       id:Joi.string().required()
    }),body:Joi.object().required().keys({
        tasks:Joi.array().items(Joi.object().keys({
            body:Joi.string()
        })).optional(),
        task:Joi.string().optional(),
        isShare:Joi.boolean().optional()
    })
}
