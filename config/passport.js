const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      function(username, password, done) {
        User.findOne({ email: username }, (err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false, { message: "User not found" });
          user.comparePassword(password, (err, isMatch) => {
            if (err) return done(null, { message: "Something went wrong" });
            if (!isMatch)
              return done(null, false, { message: "Invalid password" });
            return done(null, user);
          });
        });
      }
    )
  );
};
