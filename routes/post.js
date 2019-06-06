const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/index');
const { renderPostForm, createPost, getPost } = require('../controllers/post');

router.get('/new', isLoggedIn, renderPostForm);
router.post('/new', isLoggedIn, createPost);
router.get('/:id', getPost);

module.exports = router;