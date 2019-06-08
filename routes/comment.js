const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isOwnerComment } = require('../middlewares/index');
const { addComment, deleteComment } = require('../controllers/comment');

router.post('/', isLoggedIn, addComment);
router.post('/:commentId', isOwnerComment, deleteComment);

module.exports = router;