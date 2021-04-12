const Joi = require("@hapi/joi");
const nhanvienValidation = (nhanvien) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(
        new RegExp(
          "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$"
        )
      )
      .min(3)
      .max(32)
      .required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    birthday: Joi.date().required(),
    cmnd: Joi.string().pattern(new RegExp("^[0-9]{9,10}$")).required(),
  });
  return schema.validate(nhanvien);
};
module.exports = nhanvienValidation;
