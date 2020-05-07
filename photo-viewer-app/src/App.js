import React from 'react';
import './App.css';
import Photos from './Components/Photos'
import PhotoShow from './Components/PhotoShow'
import Login from './Components/Login'
import Navigation from './Components/Navigation'
import { Switch, Route, Redirect, withRouter  } from "react-router-dom";

class App extends React.Component {

  state={
    photos: null,
    user: null,
    dimentions: null,
    pages: null,
    photoShow: null,
    login: false
  }
  loginHendler=()=>{
    this.setState({
      login: true
    })
  }
   filterHendler = (value) => {
     console.log(value)
     fetch(`https://photo-viewer-apii.herokuapp.com/photos?filter=${value}&&page=1`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          photos: res.data,
          pages: res.pages
        })
      }
      )
  } 
  setCurrentUser=(user)=>{
    this.setState({
      login: false
    })
    this.setState({
    user:user
  })
  }
  imageHendler=(photo)=>{
    console.log(this.props)
    this.setState({photoShow: photo})
    const { history } = this.props;
    if (history) history.push(`/photos/${photo.id}`);
      
  }
  handlePageClick=(e)=>{
    fetch(`https://photo-viewer-apii.herokuapp.com/photos?page=${e.selected+1}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          photos: res.data,
          pages: res.pages
        })})
  }

  auth = () => {
    if (localStorage.getItem('currentUserToken')) {
      fetch('https://photo-viewer-apii.herokuapp.com/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('currentUserToken')}`
        }
      }).then(res => res.json())
        .then(result => { this.setCurrentUser(result.user) })
        .catch(console.log)
    }
    else {
    }
  }
componentWillMount(){
  this.auth();
}
componentDidMount(){
  fetch('https://photo-viewer-apii.herokuapp.com/photos?page=1')
    .then(res => res.json())
    .then(res => {
      console.log(res)
        this.setState({ photos: res.data,
                        pages: res.pages})
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
    <>
      <Navigation user={this.state.user}history={this.props} loginHendler={this.loginHendler}logOutHendler={this.logOutHendler} />
      <Switch>
        <Route path="/" exact render={props => <Redirect {...props} to="/photos" />} />
        <Route path="/photos" exact render={props =>
        <Photos 
        {...props}
            setCurrentUser={this.setCurrentUser}
          login={this.state.login}
          dimensions={this.state.dimentions}
          photos={this.state.photos}
          pages={this.state.pages}
          filterHendler={this.filterHendler}
          imageHendler={this.imageHendler} 
          handlePageClick={this.handlePageClick}
          />} />
        {/* <Route path="/?greyscale"  render={props =>
          <PhotoShow
            {...props}
            photo={this.state.photoShow}
          />} /> */}
        <Route path="/login" component={Login} />
        <Route path={"/photos/:id"} exact render={props =>
          <PhotoShow
            {...props}
            photo={this.state.photoShow}
          />} />
        
        {/* <Route path="/photos/:id" exact render={props =>
          <PhotoShow
            {...props}
            photo={this.state.photoShow}
          />} /> */}
        
        {/* <Route path="/photos?greyscale" component={About} exact /> */}
       
        <Route component={Error} />
      </Switch>
    </>
    
    
  );
}
  
}

export default withRouter(App);
