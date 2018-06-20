import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userDetailRequest } from '../actions/UserDetailAction';
import RecruiterMatch from './RecruiterMatch.jsx';
import RecruiterFindCandidates from './RecruiterFindCandidates.jsx';
import RecruiterFavs from './RecruiterFavs.jsx';
import { logout, deleteAccount} from '../actions/LoginActions';
import {SideNav, SideNavItem, Button, Navbar, NavItem, Icon} from 'react-materialize';
import { HashRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";

class RecruiterProfile extends Component {
    constructor(props) {
        super(props);

        this.getUser = this.props.userDetailRequest.bind(this);

        this.state = {
            user: this.getUser()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.user })
    }

    render() {
        const buttonToggleNav = (
            <Button style={{position: "absolute", right: 2 + "px", top: 2 + "px", backgroundColor: "#FFFFFF", color: "#000"}} 
                large icon='menu' />
        )

        const recruiterProfileDisplay = (
            <div>
                    <nav className="navbar" style={{backgroundColor: "#FFF", height: 57 + "px"}}>
                        <form className="form-inline my-2 my-lg-0">
                            <Icon>chevron_left</Icon>
                        </form>

                        <form className="form-inline my-2 my-lg-0" >
                            {buttonToggleNav}
                        </form>
                    </nav>
                    
                    <SideNav
                        trigger={buttonToggleNav}
                        options={{ closeOnClick: true, edge: "right", fixed: true }}
                        >
                        <SideNavItem userView
                            user={{
                            background: "../client/img/sky-3122210_1920.jpg",
                            image: this.state.user.profile_pic ? this.state.user.profile_pic : "http://localhost:8000/user.png",
                            name: this.state.user.username,
                            email: this.state.user.company
                            }}
                        />
                        <SideNavItem icon='people' href={`/#${this.props.match.url}/matches`}>Matches</SideNavItem>
                        <SideNavItem icon='search' href={`/#${this.props.match.url}/candidates`}>Find candidates</SideNavItem>
                        <SideNavItem icon='favorite' href={`/#${this.props.match.url}/favourites`}>Favourites</SideNavItem>
                        <SideNavItem divider />
                    </SideNav>
                    

                    <Router>
                        <Switch>
                            <Route path={`${this.props.match.url}/matches`} component={RecruiterMatch} />
                            <Route path={`${this.props.match.url}/candidates`} component={RecruiterFindCandidates} />
                            <Route path={`${this.props.match.url}/favourites`} component={RecruiterFavs} />
                        </Switch>
                    </Router>
                </div>
        )
        
        return (
            <div>
                {
                    this.state.user.isapproved ? recruiterProfileDisplay: <span style={{color: "#FFFFFF", fontSize: 24 + "px"}}>
                                                                                                            No wat nummmer dik
                                                                                                        </span>
                }
            </div>
        )
    }
}

RecruiterProfile.propTypes = {
    userDetailRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = ( state ) => ({
    user:  state.userDetailsReducer.user
});

export default connect(mapStateToProps,{ userDetailRequest, logout, deleteAccount })(RecruiterProfile);
