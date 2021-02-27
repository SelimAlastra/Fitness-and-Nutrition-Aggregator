import mongoose from 'mongoose';

const bucketSchema = mongoose.Schema({
    title: String,
    postsId:[String],
});
  
const Bucket = mongoose.model('Bucket', bucketSchema);
 
export default Bucket;