import React from 'react';
import LandingPage from './LandingPage.jsx';
import UserProfile from './UserProfile.jsx';
import Register from './Register.jsx';
import {HashRouter as Router, Switch, Route } from 'react-router-dom'
import authProtector from '../utils/authProtector';


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/my_profile' component={authProtector(UserProfile)}/>
        <Route exact path='/register' component={Register} />
      </Switch>
      </Router>
      );
  }
}