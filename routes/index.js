const express = require('express');
const router = express.Router();
const { getSignin, getSignup, signin, signup } = require('../controllers/auth');

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
router.get('/signin', getSignin);
router.get('/signup', getSignup);
router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;