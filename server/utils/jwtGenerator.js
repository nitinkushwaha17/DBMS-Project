const jwt = require("jsonwebtoken");

function jwtGenerator(user_id, userType) {
  const payload = {
    user: {
      id: user_id,
      userType: userType
    }
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1w" });
}

module.exports = jwtGenerator;