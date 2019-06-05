const express = require('express');
const router = express.Router();
// const passport = require('passport');
const { isLoggedIn } = require('../middlewares/index');

router.get('/new', isLoggedIn, (req, res) => {
  res.render('post/create', { title: 'New post' });
});

module.exports = router;