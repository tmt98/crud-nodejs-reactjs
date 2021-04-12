const jwt = require("jsonwebtoken");
const jwtHelper = require("../helper/jwt.helper");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const debug = console.log.bind(console);
const UserModel = require("../models/user.model");
const InfoModel = require("../models/info-user.model");
const userValidate = require("../validation/user.validation");

let tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports.register = async (req, res) => {
  const { body } = req;
  if (body.gender === "true") body.gender = true;
  else body.gender = false;
  console.log(body);
  const user = userValidate(body);
  if (user.error) {
    console.log(user.error.details[0].message);
    return res.status(422).json({ error: user.error.details[0].message });
  }
  const { value } = user;
  const checkUserExist = await UserModel.findOne({
    where: { username: body.username },
  });
  if (checkUserExist)
    return res.status(422).json({ error: "User already exists" });
  const useradd = {
    username: user.value.username,
    password: bcrypt.hashSync(user.value.password, 10),
    level: 0,
  };
  const info = {
    name: value.name,
    gender: value.gender,
    birthday: value.birthday,
    address: value.address,
    email: value.email,
    phone: value.phone,
    avatar: value.avatar,
  };
  UserModel.create(useradd)
    .then(async (user) => {
      console.log(user.dataValues._id);
      info._id_user = user.dataValues._id;
      await InfoModel.create(info)
        .then((info) => {
          console.log(info);
          res.status(200).json(info);
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    })
    .catch((err) => {
      res.status(422).json(err);
    });
};
module.exports.login = async (req, res) => {
  const { body } = req;
  console.log(body);
  console.log(typeof body.password);
  UserModel.findOne({
    where: {
      username: body.username,
    },
  }).then(async (user) => {
    if (!user) {
      res
        .status(401)
        .json({ message: "Authentication failed. User node exist." });
    } else if (user) {
      if (!user.validPassword(body.password)) {
        // if (bcrypt.compareSync(body.password, user.password) === false) {
        res
          .status(401)
          .json({ message: "Authentication failed. Wrong password." });
      } else {
        const accessToken = await jwtHelper.generateToken(
          user,
          accessTokenSecret,
          accessTokenLife
        );
        const refreshToken = await jwtHelper.generateToken(
          user,
          refreshTokenSecret,
          refreshTokenLife
        );
        tokenList[refreshToken] = { accessToken, refreshToken };
        return res.status(200).json({ accessToken, refreshToken, user });
      }
    }
  });
};
module.exports.refreshToken = async (req, res) => {
  const { body } = req;
  const refreshTokenFromClient = body.refreshToken;
  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      const decoded = await jwtHelper.verifyToken(
        refreshTokenFromClient,
        refreshTokenSecret
      );
      const user = decoded.data;
      const accessToken = await jwtHelper.generateToken(
        user,
        accessTokenSecret,
        accessTokenLife
      );
      return res.status(200).json({ accessToken });
    } catch (error) {
      debug(error);
      res.status(403).json({
        message: "Invalid refresh token.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};
module.exports.getUser = async (req, res) => {
  try {
    const accessToken = req.header("authorization");
    console.log(accessToken);
    const decoded = await jwtHelper.verifyToken(accessToken, accessTokenSecret);
    const user = decoded.data;
    return res.status(200).json(user);
  } catch (error) {
    debug("Error while verify token: ", error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
module.exports.upload = (req, res, next) => {
  console.log(req.body);
  const file = req.files.avatar;
  console.log(file);
  const { body } = req;
  cloudinary.uploader.upload(
    file.tempFilePath,
    { public_id: "avatar/" + file.md5 },
    (err, result) => {
      if (err)
        return res.send({
          success: false,
        });
      else {
        body.avatar = result.public_id;
        console.log("Result: " + result);
        next();
      }
    }
  );
};
