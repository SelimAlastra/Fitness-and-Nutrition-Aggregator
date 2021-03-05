import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    isBanned: {
        type: Boolean,
        default: false
    },
    name :{type: String},
    email :{type: String},
    gender: {type: String, enum: ["Male", "Female", "Other"]},
    dob: {type: Date}
});

const User = mongoose.model('Users', userSchema);

export default User;