import mongoose from 'mongoose';


const bucketSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String, required: false},
    postsId: [{ type: String, required: false }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'BasicUser', required: true }

},
    {
        timestamps: true,
    });

const Bucket = mongoose.model('Bucket', bucketSchema);

export default Bucket;