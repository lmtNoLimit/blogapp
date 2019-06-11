const Post = require("../models/post");

module.exports.renderPostForm = (req, res) => {
  res.render("post/create", { title: "New post" });
};

module.exports.createPost = async (req, res) => {
  let { title, image, body, tags } = req.body;
  if(!req.file) {
    image = "";
  } else {
    image = req.file.url
  }
  try {
    const post = await new Post({ title, image, body, tags, author: req.user._id });
    await post.save();
    return res.redirect("/");
  } catch (error) {
    return res.render("post/create", {
      title: "New post",
      error: "Something went wrong. Please try again."
    });
  }
};

module.exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ postedDate: -1 }).populate('author');
  res.render('index', {
    title: 'Blog App',
    posts: posts
  });
};

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments');
    return res.render('post/preview', {
      title: post.title,
      post: post
    })
  } catch (error) {
    return res.redirect('/');
  }
}

module.exports.renderEditForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.render('post/edit', {
      title: 'Edit post',
      post: post
    });
  } catch (error) {
    return res.redirect('/');
  }
}

module.exports.editPost = async (req, res) => {
  const { title, body, tags } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    post.title = title;
    post.body = body;
    post.tags = tags;
    await post.save();
    return res.redirect(`/post/${req.params.id}`);
  } catch (error) {
    console.log(error);
    req.flash('error', 'Something went wrong. Please try again');
    return res.redirect('back');
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.delete();
    return res.redirect('back');
  } catch (error) {
    req.flash('error', 'Something went wrong. Please try again!');
    return res.redirect('back');
  }
};

module.exports.searchPosts = async (req, res) => {
  const posts = await Post.find();
  let q = req.query.q.toLowerCase();
  let matched = posts.filter(post => post.title.toLowerCase().indexOf(q) !== -1 || post.body.toLowerCase().indexOf(q) !== -1 || post.tags.toLowerCase().indexOf(q) !== -1);
  console.log(matched);
  res.render('index', {
    title: 'Blog App',
    posts: matched,
  });
}