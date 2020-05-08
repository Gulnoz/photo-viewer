import React from 'react';
import './App.css';
import Photos from './Components/Photos'
import PhotoShow from './Components/PhotoShow'
import Navigation from './Components/Navigation'
import { Switch, Route, Redirect, withRouter  } from "react-router-dom";

class App extends React.Component {

  state={
    photos: null,
    user: null,
    dimentions: null,
    pages: null,
    photoShow: null,
    login: false,
    currentPage: null,
  }
loginHendler=()=>{ this.setState({login: true}) }

loginFormCloseHendler=()=> { this.setState({login: false}) }

fetchMoreData=()=>{
  if(this.state.currentPage-this.state.pages!==0){
  fetch(`https://photo-viewer-apii.herokuapp.com/photos?page=${this.state.currentPage + 1}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        photos: [...this.state.photos,...res.photos],
        pages: res.pages,
        currentPage: res.currentPage,
      })
    })}
}

filterHendler = (value) => {
    fetch(`https://photo-viewer-apii.herokuapp.com/photos?filter=${value}&&page=1`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          photos: res.photos,
          currentPage: res.currentPage,
          pages: res.pages})})
} 
setCurrentUser=(user)=>{
    this.setState({login: false})
    this.setState({user:user})
}

logOutHendler=()=>{ this.setState({user: null}) }

imageHendler=(photo)=>{
    this.setState({photoShow: photo})
    const { history } = this.props;
  if (history) history.push(`/photos/${photo.id}`);  
}
photoShowHendler=()=>{
  this.setState({ photoShow: null })
}
auth = () => {
    if (localStorage.getItem('currentUserToken')) {
      fetch('https://photo-viewer-apii.herokuapp.com/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('currentUserToken')}`
        }})
        .then(res => res.json())
        .then(result => { this.setCurrentUser(result.user) })
        .catch(console.log)
    }
}
componentWillMount(){ this.auth(); }

componentDidMount(){
  fetch('https://photo-viewer-apii.herokuapp.com/photos?page=1')
    .then(res => res.json())
    .then(res => {
        this.setState({ photos: res.photos,
                        pages: res.pages,
                        currentPage: res.currentPage })})
  fetch('https://photo-viewer-apii.herokuapp.com/photos/dimensions')
    .then(res => res.json())
    .then(res => { this.setState({ dimentions: res.dimensions }) })
}
  render(){
  return (
    <>
      <Navigation photoShowHendler={this.photoShowHendler}user={this.state.user} history={this.props} logOutHendler={this.logOutHendler}loginHendler={this.loginHendler} photoShow={this.state.photoShow} />
      <Switch>
        <Route path="/" exact render={props => <Redirect {...props} to="/photos" />} />
        <Route path={"/photos/:id"} render={props =>
          <PhotoShow
            {...props}
            imageHendler={this.imageHendler}
            photo={this.state.photoShow}
          />} />
        <Route path="/photos" render={props =>
        <Photos 
        {...props}
          fetchMoreData={this.fetchMoreData}
          loginFormCloseHendler={this.loginFormCloseHendler}
          setCurrentUser={this.setCurrentUser}
          login={this.state.login}
          dimensions={this.state.dimentions}
          photos={this.state.photos}
          pages={this.state.pages}
          filterHendler={this.filterHendler}
          imageHendler={this.imageHendler} 
          currentPage={this.state.currentPage}
          />} />
        
        <Route component={Error} />
      </Switch>
    </>
  );}}
export default withRouter(App);
