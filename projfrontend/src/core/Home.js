import React from 'react';
import '../styles.css';
import Base from './Base';

console.log("API: ",process.env.REACT_APP_BACKEND);
const Home= ()=>{
    return(
        <Base>
            <h1 className="text-white">Hello World</h1>
        </Base>
    );
}

export default Home;