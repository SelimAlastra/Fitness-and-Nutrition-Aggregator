import mongoose from 'mongoose';

const bucketSchema = mongoose.Schema({
    postsId:[String],
});
  
const Bucket = mongoose.model('Bucket', bucketSchema);
 
export default Bucket;