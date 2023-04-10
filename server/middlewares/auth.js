const jwt = require("jsonwebtoken");

//middleware will continue if the token is inside the local storage
function authorize (req, res, next) {
  // Get token from header
  const token = req.headers.authorization.split(" ")[1];

  // return if there is no token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

function isCustomer(req, res, next){
  if(req.user.userType !== "customer"){
    return res.status(403).send("Operation not allowed");
  }
  next();
}

function isSupplier(req, res, next){
  if(req.user.userType !== "supplier"){
    return res.status(403).send("Operation not allowed");
  }
  next();
}

module.exports = {authorize, isCustomer, isSupplier};