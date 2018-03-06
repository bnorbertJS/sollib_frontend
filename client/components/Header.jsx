import React, { Component } from 'react'
import Login from "./Login.jsx";
import Navbar from "./Navbar.jsx";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLoginRequest } from '../actions/LoginActions';

class Header extends Component {
    constructor(props) {
        super(props)
        
    }
    
    render() {
        return (
            <div>
                <Navbar />
                    <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Solution Library</h1>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <p className="lead">Release your inner desire !</p>
                            </div>
                            <div className="col-4">
                                <Login userLoginRequest={this.props.userLoginRequest}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    userLoginRequest: PropTypes.func.isRequired
}

export default connect(null,{ userLoginRequest })(Header);

