import mongoose from 'mongoose';
import Report from './reports.js'

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    message: {type:String, required: true},
    userFrom: {type: mongoose.Schema.Types.ObjectId, required : true, ref: 'ProfessionalUser'},
    creator: {type: String, required: true},
    tags: [{type: String, required: false}],
    selectedFile: {type: String, required: false},
    url: {type: String, required: false},
    audioFile: {type: String, required: false},
    embeddedLink: {type: String, required: false},
    facebookLink: {type: String, required: false},
    photo: {type: String, required: false},
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

postSchema.post("findOneAndDelete", (document, next) => {
    const id = document._id;
    Report.find({ postId: id }).then(objs => {
        Promise.all(
            objs.map(obj => Report.findOneAndDelete({_id : obj._id}))
        );
    });
    next();
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;