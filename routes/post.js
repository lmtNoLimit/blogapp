const express = require('express');
const router = express.Router();
const { isLoggedIn, isOwnerPost } = require('../middlewares/index');
const { renderPostForm, createPost, getPost, renderEditForm, editPost } = require('../controllers/post');

router.get('/new', isLoggedIn, renderPostForm);
router.post('/new', isLoggedIn, createPost);
router.get('/:id', getPost);
router.get('/:id/edit', isOwnerPost, renderEditForm);
router.post('/:id/edit', isOwnerPost, editPost);

module.exports = router;