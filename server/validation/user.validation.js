const Joi = require("@hapi/joi");
const userValidation = (user) => {
  const schema = Joi.object({
    username: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]+$"))
      .min(4)
      .max(32)
      .required(),
    password: Joi.string().min(6).max(32),
    name: Joi.string()
      .pattern(
        new RegExp(
          "^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ ,.'-]+$"
        )
      )
      .min(3)
      .max(32)
      .required(),
    gender: Joi.boolean().required(),
    birthday: Joi.date().required(),
    address: Joi.string().min(7).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
    avatar: Joi.string(),
  });
  return schema.validate(user);
};
module.exports = userValidation;
