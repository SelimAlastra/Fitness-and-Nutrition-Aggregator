import mongoose from 'mongoose';
import BasicUser from './basicUser.model.js'

const Schema = mongoose.Schema;

const goalSchema = new Schema({


  userID :{type: Schema.Types.ObjectId, required : true, ref: 'BasicUser'},

  description :{type: String, required: false},

  deadline :{type: String, required: false},

  tags : [{type: String,  required: false}]

}, {
  timestamps: true,
});

goalSchema.post("findOneAndDelete", (document, next) => {
  const goalId = document._id;
  BasicUser.find({ goals: { $in: [goalId] } }).then(users => {
      Promise.all(
          users.map(user => 
              BasicUser.findOneAndUpdate(
                  {_id : user._id},
                  { $pull: {goals: goalId} },
                  { new: true }
              )
          )
      );
  });
  next();
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;