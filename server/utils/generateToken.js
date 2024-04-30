/* 
    How JWT works is, First it needs to add User ID into the payload. Because it required User ID to valide the token. 
    User ID needs to be pulled out for getting relative user data
*/
import jwt from 'jsonwebtoken';

const generateToken = (res, userID) => {
    const token = jwt.sign(
        { userID}, 
        process.env.JWT_SECRET, 
        {expiresIn : '30d'}
    );
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite : 'strict', // Prevent from CSRF attacks
        maxAge : 30 * 24 * 60 * 60 * 1000
    });
};

export default generateToken;