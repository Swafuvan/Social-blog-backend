const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    content: String,
    author: {
        type:String,
        ref: 'Users'
    },
    Data:{
        fileType:String,
        file: String
    },
    likes: {
        type:[String],
        ref: 'Users',
        default: []
    },
    visible:{
        type:Boolean,
        default:true
    }
},{
    timestamps: true
})

const Blog = mongoose.model('Blogs',BlogSchema);
module.exports = Blog;