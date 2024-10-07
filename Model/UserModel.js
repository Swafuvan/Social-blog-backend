const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    image:String,
    bio:String,
    followers:{
        type:[String],
        default:[]
    },
    following:{
        type:[String],
        default:[]
    },
    Blogs:[String],
    DOB:String,
    Gender:{
        type:String,
        enum:["male","female","Others","default"],
        default:"default"
    },
    isBlocked:Boolean
},{
    timestamps:true
})

const User = mongoose.model('Users',UserSchema);
module.exports=User;