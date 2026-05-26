const jwt = require('jsonwebtoken');
const userModal = require("../modals/user");
const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    //validate cookie
    if(!Object.keys(cookie).length > 0)  throw new Error("invalid token");
    var validateToken = await jwt.verify(cookie.access_token, "abc@1234$abc");
    if (!validateToken) throw new Error("invalid token");
    const user = await userModal.findById({ _id: validateToken._id });
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
};

module.exports = { userAuth };
