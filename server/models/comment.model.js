const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

  postID :{type: Schema.Types.ObjectId, ref: 'Post',  required : true},

  userID :{type: Schema.Types.ObjectId, required : true},
  // check how to use 2 differents ref

  content :{type: String, required: true},

}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;