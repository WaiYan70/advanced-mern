import asyncHandler from 'express-async-handler';
// @description     Auth user / set token
// route            POST method api/user/auth
// @access          public access because it is accessible to anyone in which means the users are logged or not, 
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Auth User'});
});

export { authUser };