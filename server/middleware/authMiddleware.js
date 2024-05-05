// This function is to protect the cookie from attacks and routes when user logged in to access that routes 

// First, we need to check the cookie first and then we are going to parse that cookie

// And then, it needs to get the payload from the token which is the user ID using verify method to verify the token and enable us to get the decoaded payload information.

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; 
import User from '../models/user.model.js';

const protect = asyncHandler(async(req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // "req.user" mean it utilizes the route from user.controller.js
            req.user = await User.findById(decoded.userID).select('-password');
            next();
        } catch(error){
            res.status(401);
            throw new Error('Not Authorized, Invalid Token')
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, Not Token')
    }
});

export { protect };