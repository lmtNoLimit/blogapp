const Post = require("../models/post");

module.exports.renderPostForm = (req, res) => {
  res.render("post/create", { title: "New post" });
};

module.exports.createPost = async (req, res) => {
  let { title, image, body } = req.body;
  if(image === "") {
    image = "https://dummyimage.com/500x250/ddd/969696.jpg&text=<\/>"
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
