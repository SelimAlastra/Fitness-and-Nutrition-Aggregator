import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const basicUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  name :{type: String,  required: true},
  //I still don't know how to divide this in first name/ middle name/ last name

  email :{type: String, unique:true, required: true},

  hashed_password :{type: String, required: true},

  salt: String,

  gender: {type: String, enum: ["Male", "Female", "Other"], required: false},

  dob: {type: Date, required:false},

  address: {type: String, required:false},

  isBanned: {type: Boolean, required: false, default: false},

  bodyType :{type: String,  required: false},

  weight :{type: String,  required: false, default: null},

  height :{type: String,  required: false, default: null},

  goals :[{type: String,  required: false}],

  tags : [String],
  //I used an array here cause an user may have multiple tags

  bio :{type: String,  required: false},

  resetPasswordLink :{type: String, default: '', required: false},

  bundles: [{type: String, required: true}],

  buckets: [{type: String, required: true}]
}, {
  timestamps: true,
});

basicUserSchema
  .virtual('password')
  .set(function(password){
    this._password= password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function(){
    return this._password;
  });

basicUserSchema.methods = {
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
    return this.encryptPassword(plainPassword) === this.hashed_password
  }
};

const BasicUser = mongoose.model('BasicUser', basicUserSchema);

export default BasicUser;