import mongoose from 'mongoose';
import Bucket from '../models/buckets.js';
import BasicUser from '../models/basicUser.model.js';

export const getBuckets = async (req, res) => { 
   Bucket.find()
   .then(buckets => res.json(buckets))
   .catch(error => res.status(400).json("Error: Failed to get the goals " + error));
}

export const createBucket = async (req, res) => {
    const { title, description, postsId, userId } = req.body;
    const newBucket = new Bucket({ title, description, postsId, userId});

    try {
        await newBucket.save();
        await BasicUser.findByIdAndUpdate(userId, { $push: { buckets: newBucket._id } });

        res.status(201).json(newBucket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateBucket = async (req, res) => {
    const { id: _id } = req.params;
    const bucket = req.body;
  
    if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('No bucket with that id'));
  
    const updatedBucket = await Bucket.findByIdAndUpdate(_id, { ...bucket, _id }, { new: true });
  
    res.json(updatedBucket);
};

export const getBucket = async (req, res) => {
    Bucket.findById(req.params.id)
      .then(bucket => res.json(bucket))
      .catch(err => res.status(404).json('Error: Cannot find this Bucket' + err));
  };

export const deleteBucket = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('No bucket with that id'));

    await Bucket.findById(_id).then(bucket => BasicUser.findByIdAndUpdate(bucket.userId, { $pull: { buckets: _id } }));
    await Bucket.findByIdAndRemove(_id);

    res.json({ message: 'Bucket deleted successfully' });
};