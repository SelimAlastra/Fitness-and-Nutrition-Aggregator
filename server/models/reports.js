import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({

    reporterId: String,
    reportedId: String,
    reason: String,
    postId: String

}, {
    timestamps: true,
  });

const Report = mongoose.model('Reports', reportSchema);

export default Report;