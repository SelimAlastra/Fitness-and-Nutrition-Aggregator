import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password :{type: String, required: true},

}, {
  timestamps: true,
});

adminSchema.methods = {
  authenticate: function(plainText) {
    return plainText === this.password;
  }
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;