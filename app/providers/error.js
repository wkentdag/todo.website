module.exports = (res, next) => {
  return (err) => {
    if (err && err.statusCode && err.message) {
      let code = err.statusCode || 500;
      let msg = err.message || 'uncaught';
      res.status(code).json({error: msg});
    } else {
      next(err);
    }
  }
};
