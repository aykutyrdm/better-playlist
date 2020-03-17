import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


//let headerName = 'OKUL WEB IS GROWING'
let aggregateTextColor = 'green'
let filterTextColor = 'red'
let PlayListTextColor = 'black'
let headerSize = '50px'
//let headerStyle = {color : headerColor, 'font-size' : headerSize}

class Aggregate extends Component {
  render(){
    return(
      <div style = {{width : '40%' , display : 'inline-block'}}>
        <h2 style = { {color : aggregateTextColor} }> Number Text</h2>
      </div>
    )
  }
}

class Filter extends Component {

  render(){
    return(
      <div style = { {color : filterTextColor} }>
      <img/>
      <input type = 'text'/>
      Filter 
      </div>
    );
  }
}

class Playlist extends Component {
  render(){
    return(
      <div style = { {color : PlayListTextColor, width : '25%', display : 'inline-block'} }>
        <img/>
        <h3> PlayList</h3>
        <ul>
        <li>Song 1</li>
        <li>Song 2</li>
        </ul>
      </div>
    );
  }
}
  
function App() {
  return (
    <div className="App">
      <h1> Title</h1>
      <Aggregate/>
      <Aggregate/>
      <Filter/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
    </div>
  );
}

export default App;
