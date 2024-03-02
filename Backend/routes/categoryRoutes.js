const express = require("express");
const router = express.Router();
const Category = require("../controllers/categoryController");
// const middleware = require("../middleware/userMiddleware");

// Category Routes
router.post("/add", Category.createcategory);
router.get("/all", Category.getAllCategory);
router.get("/single/category/:id", Category.singleCategory);
router.delete("/delete/:id", Category.deleteCategory);
router.put("/update/:id", Category.updateCategory);

module.exports = router;
