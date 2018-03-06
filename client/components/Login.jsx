import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
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
        debugger;
    }

    render() {
    return (
        <div className="login-form">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input name="email" type="email" className="form-control"
                        onChange={this.onChange}
                        value={this.state.email}
                        placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input name="pass" type="password" className="form-control"
                        onChange={this.onChange}
                        value={this.state.pass}
                        placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
    }
}

Login.propTypes = {
    userLoginRequest: PropTypes.func.isRequired
};

export default Login;
