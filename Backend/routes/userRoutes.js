const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");
const middleware = require("../middleware/userMiddleware");

router.post("/create", User.createUser);
router.post("/login", User.LoginUser);
router.put("/update/:id", middleware, User.updateUser);
router.delete("/delete/:id", middleware, User.deleteUser);

module.exports = router;
