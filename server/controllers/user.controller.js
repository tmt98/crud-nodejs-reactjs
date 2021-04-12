const UserModel = require("../models/user.model");
const InfoModel = require("../models/info-user.model");
const userValidate = require("../validation/user.validation");
const infoUserValidate = require("../validation/user-info.validation");
const Sequelize = require("sequelize");
const jwtHelper = require("../helper/jwt.helper");
const Op = Sequelize.Op;
module.exports.getAllUser = async (req, res) => {
  try {
    const accessToken = req.header("authorization");
    const decoded = await jwtHelper.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (decoded.data.level === 1) {
      const userFind = await InfoModel.findAll();
      return res.status(200).json(userFind);
    } else
      return res.status(403).json({
        message: "Forbidden",
      });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
module.exports.sortUser = async (req, res) => {
  try {
    const accessToken = req.header("authorization");
    const decoded = await jwtHelper.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (decoded.data.level === 1) {
      const userFind = await InfoModel.findAll({
        order: [["name", "ASC"]],
      });
      return res.status(200).json(userFind);
    } else
      return res.status(403).json({
        message: "Forbidden",
      });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
module.exports.searchUserByName = async (req, res) => {
  try {
    const accessToken = req.header("authorization");
    const decoded = await jwtHelper.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (decoded.data.level === 1) {
      const userFind = await InfoModel.findAll({
        where: {
          name: {
            [Op.like]: "%" + req.params.name + "%",
          },
        },
      });
      return res.status(200).json(userFind);
    } else
      return res.status(403).json({
        message: "Forbidden",
      });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports.addUser = async (req, res) => {
  const { body } = req;
  const user = userValidate(body);
  const { value } = user;
  console.log(value);
  if (user.error) {
    console.log(user.error.details);
    res.json({ error: user.error.details });
  } else {
    const useradd = {
      username: user.value.username,
      password: user.value.password,
      level: 0,
    };
    const info = {
      name: user.value.name,
      gender: user.value.gender,
      birthday: user.value.birthday,
      address: user.value.address,
      email: user.value.email,
      photo: user.value.photo,
    };
    UserModel.create(useradd).then(async (user) => {
      console.log(user.dataValues._id);
      info._id_user = user.dataValues._id;
      await InfoModel.create(info)
        .then((info) => {
          console.log(InfoModel);
          res.status(200).json(InfoModel);
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    });
  }
};
module.exports.getUserByID = async (req, res) => {
  const id_user = req.params.id;
  const userFind = await InfoModel.findOne({ where: { _id_user: id_user } });
  res.status(200).json(userFind);
};
module.exports.updateInfoUser = async (req, res) => {
  const user = infoUserValidate(req.body);
  if (user.error) {
    console.log(user.error.details);
    res.status(422).json({ error: user.error.details });
  } else {
    const id_user = req.params.id;
    const userFind = await InfoUserModel.findOne({ _id_user: id_user });
    console.log(userFind);
    userFind.name = user.value.name;
    userFind.gender = user.value.gender;
    userFind.birthday = user.value.birthday;
    userFind.address = user.value.address;
    userFind.phone = user.value.photo;
    await userFind.save();
    res.json(userFind);
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const accessToken = req.header("authorization");
    console.log(accessToken);
    const decoded = await jwtHelper.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(decoded.data.level);
    if (decoded.data.level === 1) {
      console.log(id);
      await InfoUserModel.destroy({
        where: { _id_user: id },
        truncate: true,
      });
      await UserModel.destroy({ where: { _id: id }, truncate: true });
      return res.status(200).json({ message: "DELTETE COMPLETE" });
    } else
      return res.status(403).json({
        message: "Forbidden",
      });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
