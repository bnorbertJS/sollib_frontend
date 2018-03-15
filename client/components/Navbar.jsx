import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.onClickMe = this.onClickMe.bind(this);
    }
    
    onClickMe(){
        this.props.history.push("/my_profile");
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (
            
            <div>
               {isAuthenticated &&
                    <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="#">Solution Library</a>
                   
                    
                    <button onClick={this.onClickMe} className="transparent-btn">{user.username}</button>
                          
                  </nav>
                }
            </div>
            
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => ({ auth: state.authReducer });

export default withRouter(connect(mapStateToProps)(Navbar));