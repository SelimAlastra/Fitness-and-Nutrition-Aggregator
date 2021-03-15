import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
    username: {
        type: String,
        default: ''
    },
    description: String,
});

const Report = mongoose.model('Reports', reportSchema);

export default Report;