module.exports = (res, next) => {
  return (err) => {
    if (!(err instanceof Error)) {
      next(err);  //  forward to catch-all
    } else {
      let code = err.statusCode || 500;
      let msg = err.message || 'uncaught';
      res.status(code).json({error: msg});
    }
  }
};
