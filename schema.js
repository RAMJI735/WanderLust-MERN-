// as we pass empty listing then it is handle by middleware but if we send listing with atleast one element has filled like title or price by postman even if every filled require to create new listing ,it does not show the error so to validate individual element we use joi 
const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("",null)
    }).required()
});


// joi schema for review
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        // give min and max value because if we give 100 rating then it will accept but rating should be in 1 to 5 so we want to declare min and max value 
        comment: Joi.string().required()
    }).required()
});


// hmehsa wo naam likho jo form mein "name" mein likha hain too copy wrna error milega