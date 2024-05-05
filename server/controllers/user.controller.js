import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';

/* 
    @description     LogIn/Auth user / set token
    route            POST method /api/user/auth
    @access          public access 
*/
// because it is accessible to anyone in which means the users are logged or not, 
const authUser = asyncHandler( async(req, res) => {
    // Email and Password are needed to valide for authentication/LogIn
    const { email , password } = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
        });
    } else {
        res.status(404);
        throw new Error('Invalid Email or Password');
    }
});

/* 
    @description     Register user / set token
    route            POST method /api/user
    @access          Public access 
*/
// First, Register Controller need to be created because there is no user to authenticate or log in.
// And also, when user registered, it's going to authenticate/ login
const registerUser = asyncHandler( async(req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({email});
    if (userExist) {
        res.status(404);
        throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password });
    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,     
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/*  
    @description     LogOut user
    route            POST method /api/user/logout
    @access          Public access 
*/
// After the LogOut, it needs to destroy the cookie
const logoutUser = asyncHandler( async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires : new Date(0), 
    });
    res.status(200).json({ message : 'User Logout User'});
})

/*
    @description     Get User Profile
    route            Get Method /api/users/profile
    @access          Private access
*/
const getUserProfile = asyncHandler( async(req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
});

/*  
    @description     Update User Profile 
    route            PUT Method /api/users/profile
    @access          Private access
*/
 const updateUserProfile = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


export { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile
};