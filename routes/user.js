const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/user');
const { searchPosts } = require('../controllers/post');

router.get('/:userId', getProfile);
router.get('/search', searchPosts);

module.exports = router;