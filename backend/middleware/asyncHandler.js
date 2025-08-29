// Simple async wrapper to avoid try/catch repetition
module.exports = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
