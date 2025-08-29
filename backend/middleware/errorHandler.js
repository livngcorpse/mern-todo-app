function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  // Mongoose validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'ValidationError', details: err.errors });
  }
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
