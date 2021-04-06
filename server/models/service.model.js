import mongoose from 'mongoose';
import BasicUser from './basicUser.model.js'

const Schema = mongoose.Schema;

const serviceSchema = new Schema({

  userID :{type: Schema.Types.ObjectId, ref: 'ProfessionalUser', required : true},
  price :{type: String, required: true},
  description: {type: String, required : true},
  urls: [{type: String, required: true}],
  title: {type: String, required: true}

}, {
  timestamps: true,
});

serviceSchema.post("findOneAndDelete", (document, next) => {
  const bundleId = document._id;
  BasicUser.find({ bundles: { $in: [bundleId] } }).then(users => {
      Promise.all(
          users.map(user => 
              BasicUser.findOneAndUpdate(
                  {_id : user._id},
                  { $pull: {bundles: bundleId} },
                  { new: true }
              )
          )
      );
  });
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;