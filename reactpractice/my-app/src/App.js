import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {courses:['React','Node','Express'],
      currentInput:""};
  }

  render(){
    return(
      <div class="App">
      <h1>Courses to Learn</h1>
      <input type="Text"/>
      <button>Add to List</button>
      {this.state.courses.map(course =>{
        return(
        <p>{course}</p>
        )
      })}
      </div>
     
    )
      
    
  }
}

export default App;

