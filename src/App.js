import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import queryString from 'query-string'


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
        <h2 style = { {color : aggregateTextColor} }> {(totalDuration / (60*1000*60)).toFixed(1)} Hours</h2>
      </div>
    )
  }
}

class Filter extends Component {

  render(){
    return(
      <div style = { {color : filterTextColor} }>
      <img/>
      <input type = 'text' onKeyUp = {event => this.props.onTextChange(event.target.value)}/>
      Filter 
      </div>
    );
  }
}

class Playlist extends Component {

  
  render(){
    return(
      <div style = { {color : PlayListTextColor, width : '25%', display : 'inline-block'} }>
        <img src = {this.props.playList.imageUrl} style = {{width : '160px'}}/>
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
    this.state = {serverData : {} , filterString : ''};
  }

  componentDidMount(){

    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if(!accessToken)
      return;

    fetch('https://api.spotify.com/v1/me', {headers:{'Authorization': 'Bearer ' + String(accessToken)}})
    .then(response => response.json())
    .then((data) =>{
      this.setState({user : { name : data.display_name}})
    });

    fetch('https://api.spotify.com/v1/me/playlists', {headers:{'Authorization': 'Bearer ' + String(accessToken)}})
    .then(response => response.json())
    .then(playListData =>{
      let playLists = playListData.items
      let trackDataPromises = playLists.map(playlist =>{
        let responsePromise = fetch(playlist.tracks.href, {headers:{'Authorization': 'Bearer ' + String(accessToken)}})
        let trackDataPromise = responsePromise.then(response => response.json())
        return trackDataPromise
      })

      let allTracksDatasPromises = Promise.all(trackDataPromises)
      let playListsPromise = allTracksDatasPromises.then(tracksDatas => {
        tracksDatas.forEach((trackData, i) => {
          playLists[i].tracksDatas = trackData.items
          .map(item => item.track)
          .map(trackData => ({
            name : trackData.name,
            duration : trackData.duration_ms
          }))
        })
        return playLists
      })
      return playListsPromise
    })
    .then(playLists => {this.setState({
      playLists : playLists.map( item => {
        return {
          name : item.name , 
          imageUrl : item.images[0].url, 
          songs : item.tracksDatas.slice(0,3)
        }
      })
    })});



    setTimeout( () => {
      this.setState({filterString : ''})
    },2000);
  }

  render(){
    let filteredPlayList = this.state.user && this.state.playLists ? this.state.playLists.filter( (playLists) => {
      return playLists.name.toLowerCase().includes(this.state.filterString.toLocaleLowerCase())
    }) : []
    return(
      <div className="App">

        {this.state.user ?
        <div>
          <h1> {this.state.user.name}'s PlayList</h1>

          <PlayListCounter playLists = {this.state.user && filteredPlayList}/>

          <HoursCounter playLists = {this.state.user && filteredPlayList}/>

          <Filter onTextChange = {text => this.setState({filterString : text})}/>
          {filteredPlayList.map((playList) =>{
              return <Playlist playList = {playList}/>
            })
          }
        </div> : <button onClick ={() => window.location = 'http://localhost:8888/login'}> Sign In With Spotify</button>
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
