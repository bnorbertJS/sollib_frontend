import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userDetailRequest } from '../actions/UserDetailAction';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.getUser = this.props.userDetailRequest.bind(this);

        this.state = {
            user: this.getUser()
        }
    }

    render() {
        return (
            <div className="userprofile">
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 5 + 'em', color: 'grey', margin: 0.2 + 'em'}}>
                        <i className="fas fa-smile"></i>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 3 + 'em'}}>
                            {this.props.user.username}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block">
                            Github | Linkedin | Instagram
                    </div>
                </div>
            </div>
        )
    }
}

UserProfile.propTypes = {
    userDetailRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => ({
    user:  state.userDetailsReducer.user
});

export default connect(mapStateToProps,{ userDetailRequest })(UserProfile);
