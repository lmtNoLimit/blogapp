const Post = require("../models/post");

module.exports.renderPostForm = (req, res) => {
  res.render("post/create", { title: "New post" });
};

module.exports.createPost = async (req, res) => {
  let { title, image, body } = req.body;
  if(image === "") {
    image = "https://dummyimage.com/800x600/ddd/969696.jpg&text=<\/>"
  }
  try {
    const post = await new Post({ title, image, body, author: req.user._id });
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
  const posts = await Post.find().sort({ postedDate: -1 });
  res.render('index', {
    title: 'Blog App',
    posts: posts
  });
};

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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
  const { title, image, body } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    post.title = title;
    post.image = image;
    post.body = body;
    await post.save();
    return res.redirect(`/post/${req.params.id}`);
  } catch (error) {
    console.log(error);
    req.flash('error', 'Something went wrong. Please try again');
    return res.redirect('back');
  }
}