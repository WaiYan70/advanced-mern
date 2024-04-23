// The first middleware function is to catch all any routes that don't exist which doesn't have controller
const notFound = ( req, res, next ) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// The second one function is to catch all any errors that occur in routes
const errorHandler = ( err, req, res, next ) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if( err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = "Resource not found";
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export { notFound, errorHandler };