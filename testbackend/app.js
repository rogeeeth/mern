const express = require('express');
const app = express();

const port = 8000;


app.get('/',(req,res)=>{
    res.send('Towards MERN');
});


const login = (req,res)=>{
    res.send('Hey There Vivek!');
};
const check = (req,res,next)=>{
    console.log('Checked!');
    next();
}

app.get('/login',check,login);

app.listen(port,()=>{
 console.log('Server is Up and Running..!');
});
