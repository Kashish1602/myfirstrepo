const mongoose = require("mongoose");
const subNavbarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
    },

    navbarTitle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Navbar",
    },
  },
  {
    timestamps: true,
  }
);

const SubNavbar = mongoose.model("SubNavbar", subNavbarSchema);
module.exports = SubNavbar;
