import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SignupForm from './SignupForm.jsx';
import { userSignupRequest } from '../actions/RegisterActions';

class Register extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div className="register-page">
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 2 + 'em', color: 'grey'}}>
                        Create an account !
                    </div>
                </div>

                <SignupForm userSignupRequest={this.props.userSignupRequest}/>
            </div>
        )
    }
}

Register.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default connect(null,{ userSignupRequest })(Register);