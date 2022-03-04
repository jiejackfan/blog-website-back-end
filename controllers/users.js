import bcrypt from 'bcryptjs';
// store user in browser for a period of time
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const signin = async(req, res) => {
    const{ email, password} = req.body;
    try {
        const existing = await UserModel.findOne({email})

        if (!existing) return res.status(404).json({message:'User doesn\'t exist'});
        const  isPasswordCorrect = await bcrypt.compare(password, existing.password);
        if (!isPasswordCorrect) return res.status(400).json({message:'Invalid password'});

        const token = jwt.sign({email:existing.email, id:existing._id}, 'test', {expiresIn:'1h'});
        res.status(200).json({result:existing, token});
    } catch (e){
        res.status(500).json({message:'Something went wrong'});
    }
}

export const signup = async(req, res) => {
    const{ email, password, firstName, lastName, confirmPassword} = req.body;
    try {
        const existing = await UserModel.findOne({email})
        if (existing) return res.status(400).json({message:'User already exists'});

        if (password !== confirmPassword) return res.status(400).json({message:'Passwords don\'t match'});

        // create a new user here
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModel.create({email, password: hashedPassword, name:`${firstName} ${lastName}`});
        const token = jwt.sign({email:result.email, id:result._id}, 'test', {expiresIn:'1h'});
        res.status(200).json({result:result, token});
    } catch(error) {
        res.status(500).json({message:'Something went wrong'});
    }
}