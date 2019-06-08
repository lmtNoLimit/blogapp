const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

dotenv.config();
const app = express();

//db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(() => console.log('DB connected'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// setup passport
require('./config/passport')(app);

// custom middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// use routes
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/post/:id/comments', commentRouter);

module.exports = app;