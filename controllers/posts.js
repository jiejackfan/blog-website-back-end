import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) =>{
    try {
        const postMessage = await PostMessage.find();
        // tell everything is ok 
        res.status(200).json(postMessage);
    } catch{
        res.status(404).json({message: error.message});
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        // successfully created
        res.status(201).json(newPost);
    } catch {
        res.status(409).json({message:error.message});
    }

}

// req made to /post/123
export const updatePost = async(req, res) => {
    // comes in as /posts/id
    // rename property id
    const {id : _id} = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that ID');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new : true});
    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const {id : _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that ID');
    await PostMessage.findByIdAndDelete(_id);
    res.json({message: 'Post deleted successfully'});
}

export const likePost = async(req, res) => {
    const {id : _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that ID');
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount:post.likeCount+1}, {new:true});
    res.json(updatedPost);
}