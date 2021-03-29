import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({

    reporterUsername: {type: String, required: true},
    reportedUsername: {type: String, required: true},
    reason: {type: String, required: false},
    postId: {type: String, required: true}

}, {
    timestamps: true,
  });

const Report = mongoose.model('Reports', reportSchema);

export default Report;