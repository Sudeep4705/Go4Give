const Joi = require('joi');

const adminSchema = Joi.object({
    Admin :Joi.object({
        email:Joi.string().required(),
        username:Joi.string().required(),
        password:Joi.string().required()
    }).required()
});


module.exports = adminSchema;