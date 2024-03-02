const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const splitToken = token.split(" ")[1];
    if (!token || !splitToken) throw new Error("No Token Provided!");

    const decoded = jwt.verify(splitToken, process.env.KEY);
    const user = await User.findById(decoded._id);
    if (!user) throw new Error("User Not Found!");
    req.user = user;
    next();
  } catch (error) {
    console.log(error, "error in authenticate middleware");
  }
};

module.exports = authMiddleware;
