const jwtHelper = require("../helper/jwt.helper");
const debug = console.log.bind(console);
const accsessTokenSerect = process.env.ACCESS_TOKEN_SECRET;
let isAuth = async (req, res, next) => {
  console.log(req.header("authorization"));
  const tokenFromClient =
    req.body.accessToken ||
    req.body.token ||
    req.query.token ||
    req.header("authorization");
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accsessTokenSerect
      );
      res.jwtDecoded = decoded;
      next();
    } catch (error) {
      debug("Error while verify token: ", error);
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided",
    });
  }
};
module.exports = {
  isAuth: isAuth,
};
