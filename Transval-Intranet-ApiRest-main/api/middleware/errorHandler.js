/**
 * Centralized error handler for consistent error responses
 */
exports.handleError = (res, error, statusCode = 500, message = 'Erro interno do servidor') => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${error.message || error}`);

    if (error.stack) {
        console.error(error.stack);
    }

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        error: message,
        details: process.env.NODE_ENV === 'development' ? (error.message || error) : undefined
    }));
};

/**
 * Middleware to wrap async handlers and catch errors
 */
exports.asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            exports.handleError(res, error);
        }
    };
};
