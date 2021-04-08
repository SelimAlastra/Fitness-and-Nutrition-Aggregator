import mongoose from 'mongoose';
import crypto from 'crypto';
import PostMessage from './postMessage.js'
import Service from './service.model.js'

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

  email :{type: String, unique:true, required: true},

  hashed_password :{type: String, required: false},

  salt: String,

  profession :{type: String, required: true},

  gender: {type: String, enum: ["Male", "Female", "Other"], required: false},

  dob: {type: Date, required: false},

  address: {type: String, required: false},

  isBanned: {type: Boolean, required: false, default: false},

  tags : [{type: String,  required: false}],

  yearsOfExperience: [{type: String, required: false}],

  bio :{type: String,  required: false},

  instagramLink: {type: String, required: false},

  youtubeLink: {type: String, required: false},

  resetPasswordLink :{type: String, default: '', required: false},
  
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

professionalUserSchema.post("findOneAndDelete", (document, next) => {
  const id = document._id;
  PostMessage.find({ userFrom: id }).then(objs => {
      Promise.all(
          objs.map(obj => PostMessage.findOneAndDelete({_id : obj._id}))
      );
  });
  Service.find({ userID: id }).then(objs => {
    Promise.all(
        objs.map(obj => Service.findOneAndDelete({_id : obj._id}))
    );
  });
  next();
});

professionalUserSchema.post("findOneAndUpdate", (document, next) => {
  const id = document._id;
  ProfessionalUser.findById({_id : id}).then((user) => {
    PostMessage.find({ userFrom: id }).then(objs => {
        Promise.all(
            objs.map(obj => PostMessage.findOneAndUpdate({_id : obj._id}, {creator: user.username}))
        );
    });
  })
  next();
});


const ProfessionalUser = mongoose.model('ProfessionalUser', professionalUserSchema);

export default ProfessionalUser;