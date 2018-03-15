import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            authCred: "",
            pass: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        this.props.userLoginRequest(this.state);
    }

    onPressRegister(e){
        e.preventDefault();
        this.props.history.push("/register");
    }

    render() {
    return (
        <div className="login-form">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username/Email</label>
                    <input name="authCred" className="form-control"
                        onChange={this.onChange}
                        value={this.state.authCred}
                        placeholder="Enter username/email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="pass" type="password" className="form-control"
                        onChange={this.onChange}
                        value={this.state.pass}
                        placeholder="Password" />
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-success">Login</button>
                    </div>
                    <div className="col">
                        <button onClick={this.onPressRegister.bind(this)} className="btn btn-primary">Sign up</button>
                    </div>
                </div>  
            </form>
        </div>
    )
    }
}

Login.propTypes = {
    userLoginRequest: PropTypes.func.isRequired
};

export default withRouter(Login);
