import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({

    reporterUsername: {type: String, required: true},
    reportedUsername: {type: String, required: true},
    reason: {type: String, required: false},
    postId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'PostMessage'},

}, {
    timestamps: true,
  });

const Report = mongoose.model('Reports', reportSchema);

export default Report;
 