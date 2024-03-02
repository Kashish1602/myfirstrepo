const SubNavbar = require("../modals/subNavbarModal");

const createSubNavbar = async (req, res) => {
  try {
    const { title, link, navbarTitle } = req.body;

    const existing = await SubNavbar.findOne({
      $or: [{ title: title }, { link: link }],
    });

    if (existing) {
      return res.status(400).json({
        message: "A subNavbar with the same title or link already exists",
      });
    }

    const subNavbar = await SubNavbar.create({ title, link, navbarTitle });

    return res.status(201).json({
      message: "SubNavbar created successfully!",
      data: subNavbar,
    });
  } catch (error) {
    console.error("Error in creating subNavbar:", error);
    return res
      .status(400)
      .json({ message: "Error in Creating SubNavbar", error });
  }
};

const updateSubNavBar = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, navbarTitle } = req.body;

    const existing = await SubNavbar.findOne({
      $or: [{ title: title }, { link: link }],
    });

    if (existing) {
      return res.status(400).json({
        message: "A subNavbar with the same title or link already exists",
      });
    }

    const updatedSubNavBar = await SubNavbar.findByIdAndUpdate(
      id,
      {
        title,
        link,
        navbarTitle,
      },
      { new: true }
    );

    if (!updatedSubNavBar) {
      return res
        .status(404)
        .json({ message: "No subnavbar found with provided Id!" });
    }

    return res.status(200).json({
      message: "SubNavbar Updated Successfully!",
      data: updatedSubNavBar,
    });
  } catch (error) {
    console.log(error, "error in updating sub navbar");
    return res.status(500).json({
      status: "Failed to Update Sub Navbar",
      error: error.message,
    });
  }
};

const deleteSubNavBar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubNavBar = await SubNavbar.findByIdAndDelete(id);
    if (!deletedSubNavBar) {
      return res
        .status(404)
        .json({ message: "No subnavbar found with this ID" });
    }
    return res.status(200).json({
      message: "Deletion was successful!",
      data: deletedSubNavBar,
    });
  } catch (error) {
    console.log(error, "error in deleting the sub navbar");
    return res.status(500).json({
      status: "Failed to Delete Sub Navbar",
      error: error.message,
    });
  }
};

const getAllSubNavBar = async (req, res) => {
  try {
    const subNavbars = await SubNavbar.find().populate("navbarTitle");

    return res.status(200).json({
      success: true,
      count: subNavbars.length,
      data: subNavbars,
    });
  } catch (error) {
    console.log(error, "error in fetching the sub navbar");
    return res.status(500).json({
      status: "Failed to Fetch All Sub Navbars",
      error: error.message,
    });
  }
};

module.exports = {
  createSubNavbar,
  updateSubNavBar,
  deleteSubNavBar,
  getAllSubNavBar,
};
