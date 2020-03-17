import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


//let headerName = 'OKUL WEB IS GROWING'
let aggregateTextColor = 'green'
let filterTextColor = 'red'
let PlayListTextColor = 'black'
//let headerSize = '50px'
//let headerStyle = {color : headerColor, 'font-size' : headerSize}


let fakeServerData = {
  user : {
    name : 'Aykut',
    playLists : [
      {
        name : 'My favorities',
        songs: [
          {name : 'Hotel California', duration : 7300}, 
          {name : 'People are strange', duration : 2400}, 
          {name : 'November rain', duration : 7800}
        ]
      },
      {
        name : 'This weeks',
        songs : [
          {name : 'Day dream', duration : 7300}, 
          {name : 'Listen to rain', duration : 7300 }, 
          {name : 'Daddy cool', duration : 7300}
        ]
      },
      {
        name : 'Best deep house',
        songs : [
          {name : 'Feel', duration : 7300}, 
          {name : 'Liranov', duration : 7300}, 
          {name : 'Hoizer', duration : 7300}
        ]
      },
      {
        name : 'Turkish',
        songs : [
          {name : 'Eylulde gel', duration : 7300} ,
          {name : 'Ayrılanlar icin', duration : 7300},
          {name : 'Ispanyol meyhanesi', duration : 7300}
        ]
      }
    ]  
  }
}

class PlayListCounter extends Component {
  render(){
    return(
      <div style = {{width : '40%' , display : 'inline-block'}}>
        <h2 style = { {color : aggregateTextColor} }> {this.props.playLists && this.props.playLists.length} PlayLists</h2>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render(){
    let allSongs = this.props.playLists.reduce((songs,eachPlayList) => {
      return songs.concat(eachPlayList.songs)
    }, []);
    let totalDuration = allSongs.reduce((sum,eachSong) => {
      return sum + eachSong.duration
    },0)
    return(
      <div style = {{width : '40%' , display : 'inline-block'}}>
        <h2 style = { {color : aggregateTextColor} }> {(totalDuration / (60*1000)).toFixed(1)} Hours</h2>
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
        <h3> {this.props.playList.name} </h3>
        <ul>
          {
            this.props.playList.songs.map(song => {
              return <li> {song.name} </li>
            })
          }
        </ul>
      </div>
    );
  }
}


class Render extends Component{

  constructor() {
    super();
    this.state = {serverData : {}};
  }

  componentDidMount(){
    setTimeout( () => {
      this.setState({serverData : fakeServerData});
   } ,2000)
  }

  render(){
    return(
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1> {this.state.serverData.user.name}'s PlayList</h1>
          <PlayListCounter playLists = {this.state.serverData.user && this.state.serverData.user.playLists}/>
          <HoursCounter playLists = {this.state.serverData.user && this.state.serverData.user.playLists}/>
          <Filter/>
          {
            this.state.serverData.user.playLists.map((playList) =>{
              return <Playlist playList = {playList}/>
            })
          }
        </div> : <h1> ...Loading </h1>
        }
    </div>
    )
  }
}
  
function App() {
  
  return (
    <Render/>
  );
}

export default App;
