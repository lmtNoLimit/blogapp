const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
router.get('/signin', (req, res) => {
  res.render('signin', { title: 'Signin' });
});
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});

module.exports = router;
