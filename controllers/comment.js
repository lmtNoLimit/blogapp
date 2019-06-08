const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.addComment = async (req, res) => {
  const { text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    const comment = new Comment({
      text,
      author: {
        id: req.user._id,
        name: req.user.username
      }
    });
    await comment.save();
    post.comments.push(comment);
    await post.save();
    return res.redirect('back');
  } catch (error) {
    req.flash('error', 'Something went wrong. Please try again!');
    return res.redirect('back');
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    await comment.delete();
    return res.redirect('back');
  } catch (error) {
    req.flash('error', 'Something went wrong. Please try again!');
    return res.redirect('back');
  }
};