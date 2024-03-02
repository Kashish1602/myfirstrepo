const mongoose = require("mongoose");
const navbarSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      default: "",
    },

    logoLink: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    titleLink: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Navbar = mongoose.model("Navbar", navbarSchema);

module.exports = Navbar;
