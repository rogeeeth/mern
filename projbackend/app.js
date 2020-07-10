const mongoose = require('mongoose');
const express = require('express');
const app = express();
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

app.listen(port,()=>{
    console.log(`Server Running on Port: ${port}` );
})
