const Joi = require("@hapi/joi");
const productValidation = (product) => {
  const schema = Joi.object({
    productname: Joi.string()
      .pattern(
        new RegExp(
          "^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
        )
      )
      .min(3)
      .max(32)
      .required(),
    category_id: Joi.string().required(),
    description: Joi.string().max(256).required(),
    trademark: Joi.string().required(),
    buyprice: Joi.number().min(0).required(),
    sellprice: Joi.number().min(0).required(),
    image: Joi.string().required(),
    point: Joi.number().min(0).max(5),
  });
  return schema.validate(product);
};
module.exports = productValidation;
