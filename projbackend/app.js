const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
require('dotenv').config()


const port = process.env.APP_PORT || 8000;

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB CONNECTED');
}).catch(()=>{
    console.log('DB CONNECTION FAILED');
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);

app.listen(port,()=>{
    console.log(`Server Running on Port: ${port}` );
})
