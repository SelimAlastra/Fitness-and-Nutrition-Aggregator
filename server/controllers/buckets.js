import mongoose from 'mongoose';
import Bucket from '../models/buckets.js';

export const getBuckets = async (req, res) => { 
    try {
        const buckets = await Bucket.find();
                
        res.status(200).json(buckets);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBucket = async (req, res) => {
    const {  title, postsId } = req.body;
    const newBucket = new Bucket({ title, postsId});

    try {
        await newBucket.save();

        res.status(201).json(newBucket);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBucket = async (req, res) => {
    const { id: _id } = req.params;
    const bucket = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: id`);

    const updatedBucket = await Bucket.findByIdAndUpdate(_id,  { ...bucket, _id}, { new: true });

    res.json(updatedBucket);
}