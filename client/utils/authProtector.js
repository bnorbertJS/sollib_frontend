import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


export default function(ComposedComponent, roles){
    class AuthProtector extends Component {
        render() {
            const { role } = this.props.user;
            
            if (this.props.isAuth && roles.includes(role)) {
                return (<div>
                            <ComposedComponent {...this.props} />
                        </div>)
            } else {
                return <h1>403 Unauthorized !</h1>
            }
        }
    }

    AuthProtector.propTypes = {
        isAuth: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired
    }

    function mapStateToProps(state){
        return{
            isAuth: state.authReducer.isAuthenticated,
            user: state.authReducer.user
        };
    }

    return withRouter(connect(mapStateToProps)(AuthProtector));
}

