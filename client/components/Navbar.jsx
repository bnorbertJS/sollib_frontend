import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.onClickMe = this.onClickMe.bind(this);
    }
    
    onClickMe(){
        debugger;
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (
            
            <div>
               {isAuthenticated &&
                <nav className="navbar navbar-dark bg-dark"> 
                <a className="navbar-brand my-2 my-sm-0"></a>
                    <form className="form-inline">
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.onClickMe}>
                            <Link to="/my_profile">Me</Link>
                        </button>
                    </form>
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

export default connect(mapStateToProps)(Navbar);