const express = require("express");
const router = express.Router();
// const middleware = require("../middleware/userMiddleware");
const Product = require("../controllers/productController");

router.post("/create", Product.createProduct);
router.put("/update/:id", Product.updateProduct);
router.get("/all/products", Product.getAllProducts);
router.get("/products/:id", Product.getaProduct);
router.delete("/delete/:id", Product.deleteProduct);

module.exports = router;
