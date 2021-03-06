const Post = require("../models/post");
const Comment = require("../models/comment");

exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in for this action");
    return res.redirect("/signin");
  }
  next();
};

exports.isOwnerPost = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        req.flash("error", "Post not found!");
        return res.redirect("back");
      } else {
        if (post.author.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do this");
          return res.redirect("back");
        }
      }
    } catch (error) {
      req.flash("error", "Something went wrong");
      return res.redirect("back");
    }
  } else {
    req.flash("error", "You must be logged in for this action!");
    res.redirect("back");
  }
};

exports.isOwnerComment = async (req, res, next) => {
  if(req.isAuthenticated()) {
    try {
      const post = await Post.findById(req.params.id);
      const comment = await Comment.findById(req.params.commentId);
      if(!post || !comment) {
        req.flash("error", "Something went wrong");
        return res.redirect('back');
      }
      if(comment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash("error", "You don't have permission to do this");
        return res.redirect("back");
      }
    } catch (error) {
      req.flash("error", "Something went wrong");
      return res.redirect("back");
    }
  } else {
    req.flash("error", "You must be logged in for this action!");
    return res.redirect("back");
  }
};
