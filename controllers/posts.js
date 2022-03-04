import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) =>{
    try {
        const postMessage = await PostMessage.find();
        // tell everything is ok 
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const getPost = async (req, res) =>{
    const {id} = req.params;

    try {
        const post = await PostMessage.findById(id);
        // tell everything is ok 
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator:req.userId, createdAt: new Date()});
    try {
        await newPost.save();
        // successfully created
        res.status(201).json(newPost);
    } catch(error) {
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

    if (!req.userId) return res.json({message:'Unauthenticated user'});

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that ID');
    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((_id)=> _id === String(req.userId));
    if (index === -1) {
        //like a post
        post.likes.push(req.userId);
    } else {
        //dislike a post
        post.likes = post.likes.filter((_id)=>_id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const {id} = req.params;
    const {comment} = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(comment);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new:true});
    res.status(200).json(updatedPost);
}