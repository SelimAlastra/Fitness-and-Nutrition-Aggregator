import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    isBanned: { type: Boolean, default: false }
});

const User = mongoose.model('Users', userSchema);

export default User;