import React from 'react';
import LandingPage from './LandingPage.jsx';
import UserProfile from './UserProfile.jsx';
import NewSolution from './NewSolution.jsx';
import EditProfile from './EditProfile.jsx';
import RecruiterProfile from './RecruiterProfile.jsx';
import Profile from './Profile.jsx';
import UserMessages from './UserMessages.jsx';
import Register from './Register.jsx';
import SolutionDetails from './SolutionDetails.jsx';
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
        <Route path='/my_profile' component={authProtector(Profile, ["user", "recruiter"])}/>
        <Route exact path='/register' component={Register} />
        <Route exact path='/new_solution' component={authProtector(NewSolution, ["user"])}/>
        <Route exact path='/edit_profile' component={authProtector(EditProfile, ["user"])}/>
        <Route exact path='/user_messages' component={authProtector(UserMessages, ["user"])}/>
        <Route exact path='/solution_details/:id' component={SolutionDetails} />
      </Switch>
      </Router>
      );
  }
}