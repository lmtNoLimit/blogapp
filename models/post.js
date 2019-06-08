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
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);