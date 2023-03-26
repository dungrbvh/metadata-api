export {};
const { validationResult } = require('express-validator');
const routeError = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        for (let i = 0; i < errors.errors.length; i ++){
            console.log(
                `Route request failed due to ${errors.errors[i].msg} 
                passed to ${errors.errors[i].param} through request ${errors.errors[i].location} with value of ${errors.errors[i].value}`
            )
        }
        const err  = {
            status : 400, 
            message: 'An error occurred while processing your request. Please try again.'
        }
        return next(err);
    }
    return next();
}




module.exports = routeError;