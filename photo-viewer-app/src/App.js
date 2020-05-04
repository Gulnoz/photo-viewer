import React from 'react';
import logo from './logo.svg';
import './App.css';
import Photos from './Components/Photos'
import Login from './Components/Login'
import { Switch, Route, Redirect } from "react-router-dom";
class App extends React.Component {

  state={
    photos: null,
    user: null,
    dimentions: null,
    pages: null
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
  imageHendler=(e)=>{
    fetch(`https://photo-viewer-apii.herokuapp.com/photos/${e.target.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ photos: res })
      }
      )
  }
  handlePageClick=(e)=>{
   console.log(e)
  }
componentDidMount(){
  fetch('https://photo-viewer-apii.herokuapp.com/photos?page=1')
    .then(res => res.json())
    .then(res => {
      console.log(res)
        this.setState({ photos: res.data,
                        pages: res.pages
        })
      }
    )
  fetch('https://photo-viewer-apii.herokuapp.com/photos/dimensions')
    .then(res => res.json())
    .then(res => {
      this.setState({ dimentions: res.data })
    }
    )
  
}
  render(){
    
  return (
    <main>
      <Switch>
        <Route path="/" exact render={props => <Redirect to="/photos" />} />
        <Route path="/photos" render={props =>
        <Photos 
          dimensions={this.state.dimentions}
          photos={this.state.photos}
          pages={this.state.pages}
          filterHendler={this.filterHendler}
          imageHendler={this.imageHendler} 
          handlePageClick={this.handlePageClick}
          />} />
        
        {/* <Route path="/photos?greyscale" component={About} exact /> */}
        <Route path="/login" component={<Login/>} />
        <Route component={Error} />
      </Switch>
    </main>
    
    
  );
}
  
}

export default App;
