import mongoose from 'mongoose';
import BasicUser from './basicUser.model.js'


const bucketSchema = mongoose.Schema({
        title: { type: String, required: true },
        description: {type: String, required: false},
        postsId: [{ type: String, required: false }],
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'BasicUser', required: true }
    },
    {
        timestamps: true,
    }
);

bucketSchema.post("findOneAndDelete", (document, next) => {
    const bucketId = document._id;
    BasicUser.find({ buckets: { $in: [bucketId] } }).then(users => {
        Promise.all(
            users.map(user => 
                BasicUser.findOneAndUpdate(
                    {_id : user._id},
                    { $pull: {buckets: bucketId} },
                    { new: true }
                )
            )
        );
    });
    next();
});

const Bucket = mongoose.model('Bucket', bucketSchema);

export default Bucket;