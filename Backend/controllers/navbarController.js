const Navbar = require("../modals/navbarModal");

const createNavbar = async (req, res) => {
  try {
    const { brandName, logoLink, title, titleLink, status } = req.body;

    const existingTitle = await Navbar.findOne({
      $or: [{ title: title }, { titleLink: titleLink }],
    });

    if (existingTitle) {
      console.log("your title or titlelink already registerd");
      return res
        .status(409)
        .json({ message: "your title or titlelink already registerd" });
    }

    const navbar = await Navbar.create({
      brandName,
      logoLink,
      title,
      titleLink,
      status,
    });
    return res.status(201).json({
      message: "Navbar created successfully",
      data: navbar,
    });
  } catch (error) {
    console.error("Error in creating navbar: " + error);
    return res
      .status(400)
      .json({ message: "Error in creating navbar!", error });
  }
};

const updateNavbar = async (req, res) => {
  try {
    const { id } = req.params;
    const { brandName, logoLink, title, titleLink, status } = req.body;

    const existingTitle = await Navbar.findOne({
      $or: [{ title }, { titleLink }],
    });

    if (existingTitle) {
      console.log("your title or titlelink already registerd");
      return res
        .status(409)
        .json({ message: "your title or titlelink already registerd" });
    }
    const navbar = await Navbar.findByIdAndUpdate(
      id,
      {
        $set: { brandName, logoLink, title, titleLink, status },
      },
      { new: true }
    );

    if (!navbar) {
      return res
        .status(404)
        .json({ message: "No navbar found with provided ID!" });
    }

    return res.status(200).json({
      message: "Navbar updated successfully.",
      data: navbar,
    });
  } catch (error) {
    console.error("Error in updating navbar: " + error);
    return res
      .status(400)
      .json({ message: "Error in updating navbar!", error });
  }
};

const deleteNavbar = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNavbar = await Navbar.findByIdAndDelete(id);
    if (!deletedNavbar) {
      return res.status(404).json({ message: "Navbar not found." });
    }
    return res.status(200).json({
      message: "Navbar deleted successfully.",
      data: deletedNavbar,
    });
  } catch (error) {
    console.error("Error in deleting the navbar", error);
    return res
      .status(500)
      .json({ message: "Failed to delete the navbar.", error });
  }
};

const getNavbar = async (req, res) => {
  try {
    const navData = [];
    const allNavBars = await Navbar.find();

    for (let item of allNavBars) {
      if (item.status === true) {
        const NavBars = await Navbar.find({ status: true });
        navData.push(...NavBars);
      }
    }

    res.status(200).json({
      message: "Navbar data fetched successfully",
      count: navData.length,
      data: navData,
    });
  } catch (error) {
    console.error("Error in fetching the navbar data", error);
    res.status(500).json({
      message: "Failed to fetch the navbar data",
      error: error.message,
    });
  }
};

module.exports = {
  createNavbar,
  updateNavbar,
  deleteNavbar,
  getNavbar,
};
