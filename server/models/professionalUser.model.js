const mongoose = require('mongoose');

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

  password :{type: String, required: true},

  gender: {type: String, enum: ["Male", "Female", "Other"], required: true},

  dob: {type: Date, required:true},

  address: {type: String, required:true},

  isBanned: {type: Boolean, required: false},

  tags : [{type: String,  required: false}],
  //I used an array here cause an user may have multiple tags

  bio :{type: String,  required: false},

}, {
  timestamps: true,
});

const ProfessionalUser = mongoose.model('ProfessionalUser', professionalUserSchema);

export default ProfessionalUser;