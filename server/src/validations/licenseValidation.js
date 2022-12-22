const { object, string } = require("yup");

const licenseValidation = (req, res, next) => {
  let licenseSchema = object({
    name: string().max(240).required(),
    description: string().required(),
  });

  try {
    licenseSchema.validateSync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(err.inner);
  }
  next();
};

module.exports = licenseValidation;
