import React, { Component } from 'react'
import UserProfile from './UserProfile.jsx';
import RecruiterProfile from './RecruiterProfile.jsx';
import AdminProfile from './Admin.jsx';

class Profile extends Component {
    render() {
        const { role } = this.props.user;
        
        if(role === "user"){
            return <UserProfile {...this.props} />
        }else if(role === "recruiter"){
            return <RecruiterProfile {...this.props} />
        }else if(role === "admin"){
            return <AdminProfile {... this.props}/>
        }
    }
}

export default Profile;