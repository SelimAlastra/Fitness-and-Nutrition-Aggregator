import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const goalSchema = new Schema({


  userID :{type: Schema.Types.ObjectId, required : true, ref: 'BasicUser'},

  description :{type: String, required: false},

  deadline :{type: String, required: false},

  tags : [{type: String,  required: false}]

}, {
  timestamps: true,
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;