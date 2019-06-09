const express = require('express');
const router = express.Router();
const { isLoggedIn, isOwnerPost } = require('../middlewares/index');
const {
  renderPostForm,
  createPost,
  getPost,
  renderEditForm,
  editPost,
  deletePost
} = require("../controllers/post");
const parser = require('../handlers/cloundinary');

router.get('/new', isLoggedIn, renderPostForm);
router.post('/new', parser.single("image"), isLoggedIn, createPost);
router.get('/:id', getPost);
router.get('/:id/edit', isOwnerPost, renderEditForm);
router.post('/:id/edit', isOwnerPost, editPost);
router.post('/:id/delete', isOwnerPost, deletePost);

module.exports = router;