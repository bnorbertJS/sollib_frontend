import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


export default function(ComposedComponent){
    class AuthProtector extends Component {
        componentWillMount(){
            if(!this.props.isAuth){
                this.props.history.push("/");
                console.log("You cannot access this page. Try to log in first")
            }
        }

        componentWillUpdate(nextProps, nextState) {
            if(!nextProps.isAuth){
                this.props.history.push("/");
                console.log("You cannot access this page. Try to log in first")
            }
        }

        render() {
            return (
                <div>
                    <ComposedComponent {...this.props} />
                </div>
            )
        }
    }

    AuthProtector.propTypes = {
        isAuth: PropTypes.bool.isRequired
    }

    function mapStateToProps(state){
        return{
            isAuth: state.authReducer.isAuthenticated
        };
    }

    return withRouter(connect(mapStateToProps)(AuthProtector));
}

