import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({

    reporterUsername: String,
    reportedUsername: String,
    reason: String,
    postId: String

}, {
    timestamps: true,
  });

const Report = mongoose.model('Reports', reportSchema);

export default Report;