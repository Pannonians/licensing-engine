const { object, string } = require("yup");

const domainValidation = (req, res, next) => {
  let domainSchema = object({
    name: string().max(100).required(),
  });
  try {
    domainSchema.validateSync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.inner);
  }
  next();
};

module.exports = domainValidation;
