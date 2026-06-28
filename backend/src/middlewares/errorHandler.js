const errorHandler = (err, req, res, next) => {
  // Log full error internally (never expose stack to client)
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  const status = err.status || err.statusCode || 500;

  // Don't leak internal details in production
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'Internal server error'
    : err.message || 'Something went wrong';

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
