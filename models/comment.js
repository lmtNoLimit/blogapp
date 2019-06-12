const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String
  },
  postedDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Comment", commentSchema);