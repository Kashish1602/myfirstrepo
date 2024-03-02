const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    name: { type: String, unique: true },
    description: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
