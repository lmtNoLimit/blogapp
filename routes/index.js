const express = require('express');
const router = express.Router();
const { getSignin, getSignup, signin, signup, logout } = require('../controllers/auth');
const { getPosts } = require('../controllers/post');

router.get('/', getPosts);
router.get('/signin', getSignin);
router.get('/signup', getSignup);
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/logout', logout);

module.exports = router;