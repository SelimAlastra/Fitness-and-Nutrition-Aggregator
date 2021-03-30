import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import Bucket from '../models/buckets.js';

export const getPosts = async (req, res) => { 
    try { 
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new PostMessage({...post, createdAt : new Date().toISOString()});

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: id`);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,  { ...post, _id}, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req ,res) =>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: id`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message :'Post deleted successfully!'});
}

export const likePost = async (req, res) => {
    const { id, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);
    
     const index = post.likes.findIndex((id) => id ===String(userId));

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}

export const toggleFavAction = async  (req, res) =>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const id1= id.toString();
    const newBucketItem = new Bucket({postsId :id1});

    try {

        await newBucketItem.save();
        res.status(201).json({ message :newBucketItem});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
  }

  export const getPost = async (req, res) => {
    PostMessage.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(400).json('Error: Cannot find this post' + err));
  };

  export const getPostsFromArray = async  (req, res) =>{
    const { id } = req.params;

    try { 
        const bucket = await Bucket.findById(id);
        const postIds = bucket.postsId;
        const allPosts = await PostMessage.find();
        const bucketPosts = allPosts.filter(p => postIds.includes(p._id));

        res.status(200).json(bucketPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  };
