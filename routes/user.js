const express = require("express");
const router = express.Router();
const {
  getProfile,
  getUserInformation,
  editInformation,
  deleteUser
} = require("../controllers/user");
const { searchPosts } = require("../controllers/post");
const { isLoggedIn } = require('../middlewares/index');

router.get("/:userId", getProfile);
router.get("/search", searchPosts);
router.get("/:userId/settings", isLoggedIn, getUserInformation);
router.post("/:userId/edit", isLoggedIn, editInformation);
router.post("/:userId/settings", isLoggedIn, deleteUser);

module.exports = router;