const mongoose = require('mongoose');

const MongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://swafuvancp:omXkw1nquo4ZJobK@cluster0.pij1lwx.mongodb.net/MineBlogs');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Connection Failed: ' + error);
        process.exit(1); 
    }
};

module.exports = MongoDB;
