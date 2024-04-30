import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';

// @description     Auth user / set token
// route            POST method /api/user/auth
// @access          public access because it is accessible to anyone in which means the users are logged or not, 
const authUser = asyncHandler( async(req, res) => {
    res.status(200).json({message: 'Auth User'});
});

// @description     Register user / set token
// route            POST method /api/user
// @access          Public access
// Register Controller must be created first because there is no user to try authenticate.
// And also, when user registered, it's going to authenticate
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
    // before saving the password, it needs to hash with using bcrypt
});

// @description     LogOut user
// route            POST method /api/user/logout
// @access          Public access
const logoutUser = asyncHandler( async(req, res) => {
    res.status(200).json({ message : 'Logout User'});
})

// @description     Get User Profile
// route            Get Method /api/users/profile
// @access          Private access
const getUserProfile = asyncHandler( async(req, res) => {
    res.status(200).json({ message : 'User Profile'});
});

// @description     Update User Profile 
// route            PUT Method /api/users/profile
// @access          Private access
const updateUserProfile = asyncHandler( async(req, res) => {
    res.status(200).json({ message : 'Update User Profile'});
});


export { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile
};