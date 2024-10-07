const express = require('express');
const users = require('../controller/userController');
const { RefreshToken, authenticateJWT } = require('../helpers/JWT');
const router = express.Router();

router.get('/',authenticateJWT,users.UserHome);

router.get('/user',authenticateJWT,users.LogedUser);

router.get('/refreshToken',RefreshToken);

router.post('/login',users.UserLogin);

router.post('/signup',users.UserSignUp);

router.post('/upload-blog',authenticateJWT,users.UploadBlogs);

router.put('/editBlog',authenticateJWT,users.EditUploadedBlog);

router.put('/DeleteBlog',authenticateJWT,users.DeleteBlog);

router.get('/allUserBlog',authenticateJWT,users.UserAllBlogs)

router.get('/allBlogs',authenticateJWT,users.FindAllBlogs);

router.get('/user-details',authenticateJWT,users.UserDetails)

module.exports = router