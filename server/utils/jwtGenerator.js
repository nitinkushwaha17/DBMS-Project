const jwt = require("jsonwebtoken");

function jwtGenerator(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1d" });
}

module.exports = jwtGenerator;