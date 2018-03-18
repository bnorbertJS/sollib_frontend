import React, { Component } from 'react'
import {connect} from 'react-redux';
import {userDetailRequest} from '../actions/UserDetailAction';

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state ={
            firstname: "",
            lastname: "",
            profile_pic: "user.png"

        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount(){
        this.setState(this.props.user);
    }

    render() {
        return (
            
            <div className="editprofile-page">
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 2 + 'em', color: 'grey'}}>
                        Update your profile !
                    </div>
                </div>
                
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 2 + 'em', color: 'grey'}}>
                
                  <form action="/api/v1/profile_upload" method="POST" encType="multipart/form-data">
                    <div className="file-field input-field">
                    <div>
                        <img className="mx-auto d-block" src={"http://localhost:8000/" + this.state.profile_pic}
                            style={{width: 5 + "em", height: 5 + "em", borderRadius: 50 + "%"}}/>
                        <input name="profileImg" type="file" />
                    </div>
                    
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                    </div>
                    <button className="btn mx-auto d-block" type="submit">Change</button>
                </form>
                
                </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 2 + 'em', color: 'grey'}}>
                  <div className="row">
                    <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="first_name" onChange={this.onChange} name="firstname" value={this.state.firstname} className="validate" />
                        
                        </div>
                        <div className="input-field col s6">
                        <input id="last_name" onChange={this.onChange} name="lastname" value={this.state.lastname} className="validate" />
                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="textarea1" className="materialize-textarea"></textarea>
                            <label htmlFor="textarea1">Tell us about yourself!</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="skills" type="text" className="validate" />
                            <label htmlFor="skills">Tell us what you're good at !</label>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
                </div>
                </div>
            
        )
    }
}

const mapStateToProps = ( state ) => ({ user: state.userDetailsReducer.user });


export default connect(mapStateToProps, { userDetailRequest })(EditProfile)