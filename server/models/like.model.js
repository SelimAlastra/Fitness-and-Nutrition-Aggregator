const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, required: true },
  postID: { type: Schema.Types.ObjectId, required: true },
  //Check how to multi ref
}, {
  timestamps: true,
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;