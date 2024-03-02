const express = require("express");
const router = express.Router();
const middleware = require("../middleware/userMiddleware");
const Navbar = require("../controllers/navbarController");
const SubNavBar = require("../controllers/subNavbarController");

router.get("/", middleware, Navbar.getNavbar);
router.post("/create", Navbar.createNavbar);
router.put("/update/:id", middleware, Navbar.updateNavbar);
router.delete("/delete/:id", middleware, Navbar.deleteNavbar);

// Routes for Sub Navbars

router.post("/sub/create", SubNavBar.createSubNavbar);
router.put("/sub/update/:id", SubNavBar.updateSubNavBar);
router.delete("/sub/delete/:id", SubNavBar.deleteSubNavBar);
router.get("/sub", SubNavBar.getAllSubNavBar);

module.exports = router;
