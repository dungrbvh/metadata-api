export {};
const errorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: {
            message: 
                err.message || 'An error occurred and has been reported to the monitoring team. Please try again later.'
        }
    });
};


module.exports = errorHandler
