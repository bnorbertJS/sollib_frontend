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
                <nav className="navbar navbar-dark bg-dark"> 
                <a className="navbar-brand my-2 my-sm-0"></a>
                    <form className="form-inline">
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.onClickMe}>
                            Me
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

export default withRouter(connect(mapStateToProps)(Navbar));