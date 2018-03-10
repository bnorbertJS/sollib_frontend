import React from 'react';
import LandingPage from './LandingPage.jsx';
import UserProfile from './UserProfile.jsx';
import { Switch, Route } from 'react-router-dom'


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/my_profile' component={UserProfile}/>
      </Switch>
      );
  }
}