const Joi = require("@hapi/joi");
const categoryValidation = (category) => {
  const schema = Joi.object({
    categoryname: Joi.string()
      .pattern(
        new RegExp(
          "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
        )
      )
      .min(3)
      .max(32)
      .required(),
    description: Joi.string().max(60).required(),
  });
  return schema.validate(category);
};
module.exports = categoryValidation;
