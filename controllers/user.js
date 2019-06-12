const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.getProfile = async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    const user = await User.findById(req.params.userId);
    const name = user.name;
    const postsByUser = posts.filter(post => post.author._id.equals(req.params.userId));
    return res.render('user/profile', {
      title: name,
      posts: postsByUser
    });
  } catch (error) {
    req.flash('error', 'Something went wrong. Please try again!');
    return res.redirect('back');
  }
};

module.exports.searchPosts = async (req, res) => {
  const posts = await Post.find().populate('author');
  const user = await User.findById(req.params.userId);
  const name = user.name;
  const postsByUser = posts.filter(post => post.author._id.equals(req.params.userId));
  let matched = postsByUser.filter(post => post.title.toLowerCase().indexOf(q) !== -1 || post.body.toLowerCase().indexOf(q) !== -1);
  res.render('index', {
    title: name,
    posts: matched,
  });
};

module.exports.getUserInformation = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if(user) {
    return res.render('user/settings', {
      title: 'Account',
      user: user
    });
  } else {
    req.flash('error', 'You are not logged in to perform this action');
    res.redirect('/');
  }
};

module.exports.editInformation = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findById(req.params.userId);
    user.name = name;
    user.email = email;
    user.phone = phone;
    await user.save();
    req.flash('success', 'Account updated successfully!');
    return res.redirect('back');
  } catch (error) {
    req.flash('error', 'Something went wrong. Please try again!');
    return res.redirect('back')
  }  
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    // const comments = await Comment.find({ "author.id": userId });
    // const posts = await Post.find({ "author.id": userId });
    await Comment.deleteMany({ "author.id": req.params.userId });
    await Post.deleteMany({ author: user });
    await User.findByIdAndRemove({ _id: req.params.userId });
    return res.redirect('/');
  } catch (error) {
    req.flash('error', 'Something went wrong. Please try again!');
    return res.redirect('back');
  }
};