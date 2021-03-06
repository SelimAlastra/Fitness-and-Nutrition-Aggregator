const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  
  userID :{type: Schema.Types.ObjectId, required: true},

}, {
  timestamps: true,
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;