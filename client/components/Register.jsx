import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SignupForm from './SignupForm.jsx';
import SignupFormCompany from './SignupFormCompany.jsx';
import { userSignupRequest, recruiterSignupRequest } from '../actions/RegisterActions';
import {Button, Icon} from 'react-materialize';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUser: false,
            isRecruiter: false,
        }

        this.onClickUser = this.onClickUser.bind(this);
        this.onClickRecruiter = this.onClickRecruiter.bind(this);
    }

    onClickUser(){
        this.setState({isRecruiter: false})
        this.setState({isUser: true})
    }

    onClickRecruiter(){
        this.setState({isUser: false})
        this.setState({isRecruiter: true})
    }

    render() {
        return (
            <div className="register-page">
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 2 + 'em', color: 'grey', marginBottom: 2 + "rem"}}>
                        Create an account !
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block">
                        <Button style={{margin: 1 + "rem"}} waves='light' onClick={this.onClickUser}>
                            I'm looking for a job
                                <Icon left>person</Icon>
                        </Button>
                        
                        <Button style={{margin: 1 + "rem"}} waves='light' onClick={this.onClickRecruiter}>
                            I'm a recruiter
                                <Icon right>record_voice_over</Icon>
                        </Button>
                    </div>
                </div>
            
                <div className={this.state.isUser ? null : "hideForm"}>
                    <SignupForm 
                        userSignupRequest={this.props.userSignupRequest}/>  
                </div>

                <div className={this.state.isRecruiter ? null : "hideForm"}>
                    <SignupFormCompany
                            recruiterSignupRequest={this.props.recruiterSignupRequest}/>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    recruiterSignupRequest: PropTypes.func.isRequired
}

export default connect(null,{ userSignupRequest, recruiterSignupRequest })(Register);