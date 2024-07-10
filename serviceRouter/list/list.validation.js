const Joi = require("joi");

module.exports.validateupdateListTask = {
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