const { generateAccessToken, generateRefreshToken } = require('../helpers/JWT.js')
const Blog = require('../Model/BlogsModel.js')
const User = require('../Model/UserModel.js')
const bcrypt = require('bcryptjs')


const UserHome = () => {
    try {
        console.log('home page --------------------------------')
    } catch (error) {
        console.log(error)
    }
}

const LogedUser = async (req, res) => {
    try {
        const user = req.user
        const userData = await User.findById(user.id);
        if (userData) {
            return res.status(200).json({ User: userData });
        }
        res.status(205).json({ message: "sorry There is no User" });
    } catch (error) {
        console.log(error);
    }
}


const UserLogin = async (req, res) => {
    try {
        const datas = req.body;
        if (!datas) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }
        console.log(datas)
        const userRes = await User.findOne({ email: datas.email });
        if (userRes) {
            const password = await bcrypt.compare(datas.password, userRes.password);
            if (password) {
                const JWTToken = generateAccessToken(userRes);
                const JWTrefreshToken = generateRefreshToken(userRes);
                return res.status(200).json({ User: userRes, JWTToken: JWTToken });
            }
        }
        res.status(205).json({ message: 'Sorry there is no User' })
    } catch (error) {
        console.log(error);
    }
}

const UserSignUp = async (req, res) => {
    try {
        const datas = req.body;
        if (!datas) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }
        const salt = await bcrypt.genSalt(10);
        datas.password = await bcrypt.hash(datas.password, salt);
        console.log(datas.password);
        const AfterSignup = await User.create({
            email: datas.email,
            phone: datas.mobile,
            password: datas.password,
            username: 'User',
            image: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
            bio: "Hi Guys, I am using SocialBlog",
            DOB: "",
            Gender: "default",
            isBlocked: false,
        })
        console.log(AfterSignup);
        if (AfterSignup) {
            return res.status(200).json({ message: "User Created Successfully", User: AfterSignup });
        }
        res.status(205).json({ message: 'Sorry you got a trouble' })
    } catch (error) {
        console.log(error);
    }
}

const EditUploadedBlog = async (req, res) => {
    try {
        const { BlogData, changed } = req.body;
        console.log(BlogData, changed);
        const blogsData = await Blog.findOneAndUpdate({ author: BlogData.author._id, _id: BlogData._id },{
            $set: {
                title: changed.BlogTitle,
                content:changed.BlogContent
            }
        });
        if(blogsData){
            console.log(blogsData,'finally get it');
            return res.status(200).json({message:"Edited successfully",Blogs:blogsData});
        }
        res.status(205).json({message:"sorry Blog not Edited"});
    } catch (error) {
        console.log(error);
    }
}

const DeleteBlog = async (req, res) => {
    try {
        const BlogData = req.body;
        console.log(BlogData);
        const blogData = await Blog.findOneAndUpdate({ author: BlogData.author._id, _id: BlogData._id },{
            $set:{
                visible:false
            }
        });
        console.log(blogData,'yes found');
        if(blogData){
            return res.status(200).json({message:"Deleted successfully"});
        }
        res.status(205).json({message:"sorry Blog not deleted"});
    } catch (error) {
        console.log(error);
    }
}

const FindAllBlogs = async (req, res) => {
    try {
        const allPost = await Blog.find({ visible: true }).populate('author').sort({createdAt:-1});
        if (allPost) {
            console.log(allPost)
            return res.status(200).json({ Blogs: allPost });
        }
        res.status(205).json({ message: "sorry there is no Blogs" });
    } catch (error) {
        console.log(error);
    }
}

const UserAllBlogs = async (req,res) => {
    try {
        const userId = req.query.userId;
        const allBlogs = await Blog.find({author:userId,visible:true}).sort({createdAt:-1})
        if(allBlogs){
            console.log(allBlogs);
            return res.status(200).json({Blogs:allBlogs})
        }
        res.status(205).json({message:'there is no Blog'});
    } catch (error) {
        console.log(error);
    }
}

const UploadBlogs = async (req, res) => {
    try {
        const blogs = req.body.BlogData;
        const userId = req.body.userId;
        if (blogs.Data[0]) {
            const userBlogs = await Blog.create({
                title: blogs.title,
                content: blogs.content,
                Data: {
                    file: blogs.Data[0].file,
                    fileType: blogs.Data[0].filetype
                },
                author: userId,
            })
            if (userBlogs) {
                console.log(userBlogs)
                return res.status(200).json({ message: "Blog Created Successfully", Blog: userBlogs });
            }
            res.status(205).json({ message: "sorry failed post Blog" })
        } else {
            const userBlogs = await Blog.create({
                title: blogs.title,
                content: blogs.content,
                author: userId,
            })
            if (userBlogs) {
                console.log(userBlogs)
                return res.status(200).json({ message: "Blog Created Successfully", Blog: userBlogs });
            }
            res.status(205).json({ message: "sorry failed post Blog" })
        }
    } catch (error) {
        console.log(error);
    }
}

const UserDetails = async (req, res) => {
    try {
        console.log("yes it's here")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    UserHome, UserLogin, UserSignUp, UploadBlogs, UserDetails, LogedUser, EditUploadedBlog,
    FindAllBlogs, DeleteBlog, UserAllBlogs
}