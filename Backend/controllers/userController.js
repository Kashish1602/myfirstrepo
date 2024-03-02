const User = require("../modals/userModal");
const { Validator } = require("node-input-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, genSalt);

    const v = new Validator(req.body, {
      name: "required",
      email: "required|email",
      password: "required|minLength:7",
      role: "required|in:admin,client",
    });

    const isCheck = await v.check();
    if (!isCheck) {
      return res.status(406).json({ errorMessage: v.errors });
    }

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res
        .status(409)
        .json({ errorMessage: "User is already registered" });
    }

    const userPass = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    };

    let user = await User.create(userPass);
    console.log(user);
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.log(`Error in creating new user : ${error}`);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Credentials not found" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: token,
      },
    });
  } catch (error) {
    console.log("Login Error : ", error);
    return res.status(500).json({ message: "Authentication failed" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        },
      },
      {
        new: true,
      }
    );
    if (!updateUser) {
      return res
        .status(404)
        .json({ message: "No user found with the given ID." });
    }
    res.status(200).json({
      success: true,
      data: updateUser,
    });
  } catch (error) {
    console.log("Update User Error : ", error);
    res.status(400).send("Error updating user", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteduser = await User.findByIdAndDelete(id);
    if (!deleteduser) {
      return res
        .status(404)
        .json({ message: "No user found with the given ID." });
    }
    res.status(200).json({
      success: true,
      data: deleteduser,
    });
  } catch (error) {
    console.log("Delete User Error : ", error);
    res.status(500).send("Server Error during the deletion process", error);
  }
};

module.exports = {
  createUser,
  LoginUser,
  deleteUser,
  updateUser,
};
