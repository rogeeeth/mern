import React from 'react';
import './App.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {courses:[],
    newItem:""};
      this.addItem = this.addItem.bind(this);
  }

  addItem(inputValue){
    if(inputValue !==""){
    const newItem = {
      id:inputValue+'-'+Date.now(),
      value:inputValue,
      isDone:false
    }
    let list = [...this.state.courses];
    list.push(newItem);
    this.setState({
      courses:list,
      newItem:""
    });
  }

  }

  deleteItem(id){
    let list = [...this.state.courses];
    let updatedList = list.filter((item)=>item.id!==id);
    this.setState({
      courses:updatedList
    });
  }

  newInput(input){
    this.setState({
      newItem:input
    });
  }

  render(){
    return(
      <div className="App">
      <h1>Courses to Learn</h1>
      <input type="Text" required value={this.state.newItem} onChange={e =>this.newInput(e.target.value)}/>
      <button onClick={()=>this.addItem(this.state.newItem)} disabled={!this.state.newItem.length}>Add to List</button>
      <ul>
      {this.state.courses.map(course =>{
        return(

        <li key={course.id}><input type="checkbox"/>{course.value}<button onClick={e=>{this.deleteItem(course.id)}}>Delete</button></li>
  
        )
      })}
      </ul>
      </div>
     
    )
      
    
  }
}

export default App;

