const cloudinary = require("cloudinary").v2;
const ProductModel = require("../models/product.model");
const StorageModel = require("../models/storage.model");
const Category = require("../models/category.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const productValidate = require("../validation/product.validation");
const Product = require("../models/product.model");
module.exports.getAllProduct = async (req, res) => {
  const productFind = await ProductModel.findAll({
    include: [
      {
        model: Category,
        required: true,
      },
      {
        model: StorageModel,
        required: true,
      },
    ],
  });
  res.status(200).json(productFind);
};
module.exports.searchByName = async (req, res) => {
  console.log(req.params.name);
  const { name } = req.params;
  const productFind = await ProductModel.findAll({
    where: {
      productname: { [Op.like]: "%" + req.params.name + "%" },
    },
    include: [
      {
        model: Category,
        required: true,
      },
      {
        model: StorageModel,
        required: true,
      },
    ],
  });
  res.status(200).json(productFind);
};
module.exports.getProductByCategory = async (req, res) => {
  console.log(req.params.category);
  const productFind = await ProductModel.findAll({
    where: {
      category_id: req.params.category,
    },
    include: [
      {
        model: Category,
        required: true,
      },
      {
        model: StorageModel,
        required: true,
      },
    ],
  });
  res.status(200).json(productFind);
};
module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findByPk(id, {
    include: [
      {
        model: Category,
        required: true,
      },
      {
        model: StorageModel,
        required: true,
      },
    ],
  });
  res.status(200).json(product);
};
module.exports.addProduct = async (req, res) => {
  const { body } = req;
  const product = productValidate(body);
  if (product.error) {
    console.log(product.error.details[0].message);
    return res.status(422).json({ error: product.error.details[0].message });
  }
  const { value } = product;
  const checkProductExist = await ProductModel.findOne({
    where: {
      productname: body.productname,
    },
  });
  if (checkProductExist)
    return res.status(422).json({ error: "Product already exists" });
  ProductModel.create(value)
    .then(async (product) => {
      console.log(product.dataValues.product_id);
      const Product = product.dataValues;
      console.log(Product.category_id);
      Product.Category = await Category.findByPk(Product.category_id);
      await StorageModel.create({ product_id: product.dataValues.product_id })
        .then((storage) => {
          Product.Storage = storage.dataValues;
          console.log(Product);
          return res.status(200).json(Product);
        })
        .catch((error) => {
          return res.status(422).json(error);
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(422).json(error);
    });
};
module.exports.editProduct = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const product = productValidate(body);
  if (product.error) {
    console.log(product.error.details[0].message);
    return res.status(422).json({ error: product.error.details[0].message });
  }
  const { value } = product;
  const data = {
    productname: value.productname,
    description: value.description,
    category_id: value.category_id,
    trademark: value.trademark,
    buyprice: value.buyprice,
    sellprice: value.sellprice,
    image: value.image,
    point: value.point,
  };
  ProductModel.update(data, {
    where: {
      product_id: id,
    },
  })
    .then(async (product_item) => {
      console.log(product_item);
      const result = await ProductModel.findByPk(id, {
        include: [
          {
            model: Category,
            required: true,
          },
          {
            model: StorageModel,
            required: true,
          },
        ],
      });
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(422).json(error);
    });
};
module.exports.uploadProductImage = (req, res, next) => {
  console.log(req.body);
  if (req.body.image) return next();
  const file = req.files.image;
  console.log(file);
  const { body } = req;
  cloudinary.uploader.upload(
    file.tempFilePath,
    {
      public_id: "product/" + file.md5,
    },
    (err, result) => {
      if (err)
        return res.send({
          success: false,
        });
      else {
        body.image = result.public_id;
        next();
      }
    }
  );
};
module.exports.addStock = async (req, res) => {
  const { body } = req;
  const id = req.params.id;
  const storage = await StorageModel.findByPk(id);
  const data = {
    stock: parseInt(storage.dataValues.stock) + parseInt(body.stock),
    total: parseInt(storage.dataValues.total) + parseInt(body.stock),
  };
  console.log(body.stock);
  console.log(data);
  StorageModel.update(data, { where: { product_id: id } })
    .then(async (storage_tf) => {
      const result = await ProductModel.findByPk(id, {
        include: [
          {
            model: Category,
            required: true,
          },
          {
            model: StorageModel,
            required: true,
          },
        ],
      });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
};
