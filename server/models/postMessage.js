import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    userFrom: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    url: String,
    audioFile: String,
    embeddedLink: String,
    facebookLink: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});



const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;