const jwt = require("jsonwebtoken");
const { errorMonitor } = require("stream");
let generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, rejects) => {
    const userData = {
      _id: user._id,
      username: user.username,
      level: user.level,
    };
    jwt.sign(
      {
        data: userData,
      },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          rejects(error);
        }
        resolve(token);
      }
    );
  });
};
let verifyToken = (token, serectKey) => {
  return new Promise((resolve, rejects) => {
    jwt.verify(token, serectKey, (error, decoded) => {
      if (error) {
        return rejects(error);
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};
