const jwtHelper = require("../helper/jwt.helper");
const CategoryModel = require("../models/category.model");
const categoryValidate = require("../validation/category.validation");

module.exports.getAllCategory = async (req, res) => {
  const categoryFind = await CategoryModel.findAll();
  res.status(200).json(categoryFind);
};
module.exports.addCategory = async (req, res) => {
  const { body } = req;
  const category = categoryValidate(body);
  if (category.error) {
    console.log(category.error.detail[0].message);
    return res.status(422).json({ error: category.error.detail[0].message });
  }
  const { value } = category;
  console.log(value.categoryname);
  // const checkCategoryExist = await CategoryModel.findOne({
  //   where: {
  //     categoryname: value.categoryname,
  //   },
  // });
  // console.log(checkCategoryExist);
  // if (checkCategoryExist)
  //   return res.status(422).json({ error: "Category already exists" });
  CategoryModel.create(value)
    .then(async (category) => {
      console.log(category);
      res.status(200).json(category);
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json(error);
    });
};
module.exports.editCategory = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  console.log(id);
  console.log(body);
  const category = categoryValidate({
    categoryname: body.categoryname,
    description: body.description,
  });
  if (category.error) {
    console.log(category);
    return res.status(422).json({ error: category });
  }
  const { value } = category;
  console.log(category);
  CategoryModel.update(
    {
      categoryname: value.categoryname,
      description: value.description,
    },
    { where: { category_id: id } }
  )
    .then(async (category_item) => {
      console.log(category_item);
      const result = await CategoryModel.findByPk(id);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json("Line 64" + error);
    });
};
