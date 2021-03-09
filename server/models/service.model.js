import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const serviceSchema = new Schema({

  userID :{type: Schema.Types.ObjectId, ref: 'ProfessionalUser', required : true},
  price :{type: String, required: true},
  description: {type: String ,required : true}

}, {
  timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;