import mongoose from 'mongoose';

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

  password :{type: String, required: true},

  gender: {type: String, enum: ["Male", "Female", "Other"], required: false},

  dob: {type: Date, required:false},

  address: {type: String, required:false},

  isBanned: {type: Boolean, required: false, default: false},

  bodyType :{type: String,  required: false},

  weight :{type: String,  required: false, default: null},

  goals :[{type: String,  required: false}],

  tags : [{type: String,  required: false}],
  //I used an array here cause an user may have multiple tags

  bio :{type: String,  required: false},

  resetPasswordLink :{type: String, default: '', required: false},

}, {
  timestamps: true,
});

basicUserSchema
  .virtual('password2')
  .set(function(password2){
    this.password = password2;
  })
  .get(function(){
    return this.password;
  });

basicUserSchema.methods = {
  authenticate: function(plainText) {
    return plainText === this.password;
  }
};

const BasicUser = mongoose.model('BasicUser', basicUserSchema);

export default BasicUser;