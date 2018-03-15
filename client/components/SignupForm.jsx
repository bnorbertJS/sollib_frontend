import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            lastname: "",
            firstname: "",
            email: "",
            pass: "",
            pass_match: ""
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onPressCreateAccount(e){
        e.preventDefault();
        this.props.userSignupRequest(this.state).then((data) => this.props.history.push("/"));
    }
    

    render() {
        return (
            <div className="register-form">
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block">
                    <div className="col col-lg-12">
                        <div className="form-group">
                            <input name="username" className="form-control"
                                onChange={this.onChange}
                                value={this.state.username}
                                placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <input name="lastname" className="form-control"
                                onChange={this.onChange}
                                value={this.state.lastname}
                                placeholder="Enter lastname" />
                        </div>
                        <div className="form-group">
                            <input name="firstname" className="form-control"
                                onChange={this.onChange}
                                value={this.state.firstname}
                                placeholder="Enter firstname" />
                        </div>
                        <div className="form-group">
                            <input name="email" type="email" className="form-control"
                                onChange={this.onChange}
                                value={this.state.email}
                                placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <input name="pass" type="password" className="form-control"
                                onChange={this.onChange}
                                value={this.state.pass}
                                placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <input name="pass_match" type="password" className="form-control"
                                onChange={this.onChange}
                                value={this.state.pass_match}
                                placeholder="Enter password again" />
                        </div>
                        <button onClick={this.onPressCreateAccount.bind(this)} className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default withRouter(SignupForm);