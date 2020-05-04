import React from 'react';
import logo from './logo.svg';
import './App.css';
import Photos from './Components/Photos'
class App extends React.Component {

  state={
    photos: null,
    user: null,
    dimentions: null
  }
   filterHendler = (value) => {
     console.log(value)
     fetch(`https://photo-viewer-apii.herokuapp.com/photos?filter=${value}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          photos: res
        })
      }
      )
  } 
componentDidMount(){
  fetch('https://photo-viewer-apii.herokuapp.com/photos')
    .then(res => res.json())
    .then(res => {
       
        this.setState({ photos: res })
      }
    )
  fetch('http://localhost:3000/photos/dimensions')
    .then(res => res.json())
    .then(res => {
      this.setState({ dimentions: res.data })
    }
    )
  
}
  render(){
    
  return (
    <Photos dimensions={this.state.dimentions} photos={this.state.photos} filterHendler={this.filterHendler}/>
     
  );
}
  
}

export default App;
