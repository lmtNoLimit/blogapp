const Post = require('../models/post');
const User = require('../models/user');

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