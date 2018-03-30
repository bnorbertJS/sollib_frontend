import React, { Component } from 'react'
import UserProfile from './UserProfile.jsx';
import RecruiterProfile from './RecruiterProfile.jsx';

class Profile extends Component {
    render() {
        const { role } = this.props.user;
        if(role === "user"){
            return <UserProfile {...this.props} />
        }else if(role === "recruiter"){
            return <RecruiterProfile {...this.props} />
        }else{
            return <div>Admin</div>
        }
    }
}

export default Profile;