import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const professionalUserSchema = new Schema({
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

  hashed_password :{type: String, required: false},

  salt: String,

  profession :{type: String, required: true},

  gender: {type: String, enum: ["Male", "Female", "Other"], required: false},

  dob: {type: Date, required: false},

  address: {type: String, required: false},

  isBanned: {type: Boolean, required: false, default: false},

  tags : [{type: String,  required: false}],
  //I used an array here cause an user may have multiple tags

  yearsOfExperience: [{type: String, required: false}],

  bio :{type: String,  required: false},

  instagramLink: {type: String, required: false},

  youtubeLink: {type: String, required: false},

  resetPasswordLink :{type: String, default: '', required: false},

  picture: {type: String, required: false},
}, {
  timestamps: true,
});

professionalUserSchema
  .virtual('password')
  .set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)

  })
  .get(function(){
    return this._password;
  });

professionalUserSchema.methods = {
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

const ProfessionalUser = mongoose.model('ProfessionalUser', professionalUserSchema);

export default ProfessionalUser;


