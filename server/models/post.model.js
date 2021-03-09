const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({

  userID :{type: Schema.Types.ObjectId, required : true},
  // check how to use 2 differents ref
  
  content :{type: String, required: true}

}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
export default Post;

