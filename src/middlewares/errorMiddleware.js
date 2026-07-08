const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Sunucu hatası';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Geçersiz ID formatı';
  }

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorMiddleware;