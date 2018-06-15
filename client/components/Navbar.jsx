import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/LoginActions';
import {NavItem, Button, Dropdown} from 'react-materialize';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.onClickLogoutNavbar = this.onClickLogoutNavbar.bind(this)
        this.onClickMe = this.onClickMe.bind(this);
    }
    
    onClickMe(e){
        e.preventDefault();
        this.props.history.push("/my_profile");
    }

    onClickLogoutNavbar(e){
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        return (
            <div>
               {isAuthenticated &&
                <nav className="navbar navbar-light" style={{backgroundColor: "#FFF"}}>
                    <a className="navbar-brand" href="#">Solution Library</a>
                   
                    <Dropdown trigger={
                        <a style={{cursor: "pointer", color: "#000"}}>{user.username}</a>
                    }>
                        <NavItem onClick={this.onClickMe}>Profile</NavItem>
                        <NavItem divider />
                        <NavItem onClick={this.onClickLogoutNavbar}>Logout</NavItem>
                    </Dropdown>    
                </nav>

                }
            </div>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = ( state ) => ({ auth: state.authReducer });

export default withRouter(connect(mapStateToProps, { logout })(Navbar));