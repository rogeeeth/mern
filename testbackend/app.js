const express = require('express');

const app = express();
const port = 8000;


app.get('/',(req,res)=>{
    res.send('Towards MERN');
});

app.get('/login',(req,res)=>{
    res.send('Hey There!');
});

app.listen(port,()=>{
 console.log('Server is Up and Running..!');
});
