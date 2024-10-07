const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv/config.js')
const app = express();


const userRouter = require('./routes/userRoutes');
const MongoDB  = require('./Model/database');

app.use(cors());
app.use(express.json());

MongoDB();

app.use('/',userRouter)

app.use(express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT,()=>{
    console.log('Server is running on port 4000');
});

module.exports = app