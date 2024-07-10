const Joi = require("joi");

module.exports.validatesignup = {
    body: Joi.object().required().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('[a-z]{4}')).message("password should by 4 char"),
    })
}
module.exports.validatesignin = {
    body: Joi.object().required().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('[a-z]{4}'))
    })
}