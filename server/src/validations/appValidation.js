const { object, string } = require("yup");

const appValidation = (req, res, next) => {
  let appSchema = object({
    name: string().max(100).required(),
    description: string().required(),
  });
  try {
    appSchema.validateSync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.inner);
  }
  next();
};

module.exports = appValidation;
