// Import React
import React, { Component } from 'react';
 
import {Router,navigate} from '@reach/router' ;
import firebase from './Firebase' ; 

import Home from './Home' ; 
import Welcome from './Welcome' ; 
import Navigation from './Navigation' ; 
import Login from './Login' ; 
import Meeting from './Meeting' ; 
import Register from './Register' ;



class App extends Component {

   
  constructor(){
    super() ; 
    this.state  = {
      user: null , 
      displayName: null , 
      userId: null 
    } ; 
  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        this.setState({
          user: FBUser, 
          displayName: FBUser.displayName, 
          userID: FBUser.uid 
        });
      }
    });

  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/meetings');
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/login');
      });
  };

  render() {
    return (
      <div> 




        <Navigation
          user={this.state.user}
          logOutUser={this.logOutUser}
        />
        {this.state.user && (
          <Welcome
            userName={this.state.displayName}
            logOutUser={this.logOutUser}
          />
        )}
        <Router> 
          <Home path="/" user={this.state.user} /> 
          <Login path="/login"  /> 
          <Meeting path="/meetings"  /> 
          <Register path="/register"  registerUser={this.registerUser}/> 
          <Login path="/login"  /> 
        </Router>

      </div>
    ) ;  
  } 
 
}

export default App;
