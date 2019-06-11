const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  body: {
    type: String,
  },
  postedDate: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  tags: {
    type: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);