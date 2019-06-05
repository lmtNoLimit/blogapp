const User = require("../models/user");
const passport = require('passport');

module.exports.getSignin = (req, res) => {
  res.render("auth/signin", { title: "Signin" });
};

module.exports.getSignup = (req, res) => {
  res.render("auth/signup", { title: "Signup" });
};

module.exports.signin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
});

module.exports.signup = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      return res.render('auth/signup', { 
        title: 'Signup',
        error: 'An account with this email is already exist!'
      });
    } else {
      const newUser = await new User(req.body);
      await newUser.save();
      req.flash('success', 'Account created successfully. Please login');
      return res.redirect('/signin');
    }
  } catch (error) {
    req.flash('error', 'Something went wrong. Please try again');
    res.redirect('/signup')
  }  
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/')
}
