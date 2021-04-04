import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  hashed_password :{type: String, required: true},

  salt: String,

}, {
  timestamps: true,
});

adminSchema
  .virtual('password')
  .set(function(password){
    this._password= password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function(){
    return this._password;
  });

  adminSchema.methods = {
  makeSalt: function(){
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },

  encryptPassword: function(password){
    if(!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    }
    catch(err){
      return ''
    }
  },
  authenticate: function(plainPassword){
    return this.encryptPassword(plainPassword) === this.hashed_password;
  }
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;