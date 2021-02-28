import mongoose from 'mongoose';

const issueSchema = mongoose.Schema({
    username: String,
    description: String,
});

const Issue = mongoose.model('Issues', issueSchema);

export default Issue;