const { object, string } = require("yup");

const tokenValidation = (req, res, next) => {
  let tokenSchema = object({
    token: string().max(64).required(),
  });
  try {
    tokenSchema.validateSync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.inner);
  }
  next();
};

module.exports = tokenValidation;
