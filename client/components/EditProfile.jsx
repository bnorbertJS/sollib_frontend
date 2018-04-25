import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Button, Row, Input, Icon, Tag, Chip, Col} from 'react-materialize';
import {userDetailRequest} from '../actions/UserDetailAction';

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSkill: "",
            username: "",
            profile_pic: "user.png",
            firstname: "",
            lastname: "",
            email: "",
            github: "",
            linkedin: "",
            webpage: "",
            self_intro: "",
            level: "",
            skills: []
        }
        this.addSkillsToState = this.addSkillsToState.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClickSaveProfile = this.onClickSaveProfile.bind(this);
        this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount(){
        this.props.userDetailRequest()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({profile_pic: "user.png"});
        this.setState(nextProps.user);
    }

    onClickSaveProfile(){
        axios({
            method: 'post',
            url: '/api/v1/profile_update',
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            },
            data: this.state
        })
        .then((data) => {
            const {user} = data.data;
            this.setState({
                lastname: user.lastname,
                firstname: user.firstname,
                github: user.github_url,
                linkedin: user.linkedin_url,
                webpage: user.homepage_url,
                self_intro: user.self_intro,
                level: user.level,
                skills: user.skills,
            });
        })
        .catch((err) => { console.log(err) });
    }

    onChangeProfilePicture(e){
        const data = new FormData();
        data.append("profileImg",e.target.files[0]);
        debugger;
        axios({
            method: 'post',
            url: '/api/v1/profile_upload',
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token"),
                'content-type': 'multipart/form-data'
            },
            data: data
        })
        .then((data) => {
            //put new picture name to state
            this.setState({ profile_pic: data.data.success });
        })
        .catch((err) => { console.log(err) });
    }

    onChangeSkills(e){
        this.setState({ currentSkill: e.target.value })
    }

    addSkillsToState(e){
        if (e.key === 'Enter' && e.target.value !== "") {
            this.setState({
                skills: [...this.state.skills, {name: e.target.value}],
            })
        }
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
                        <input name="profileImg" type="file" onChange={this.onChangeProfilePicture}/>
                    </div>
                    </div>
                    {/*<div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                    
                    <button className="btn mx-auto d-block" type="submit">Change</button> */}
                </form>
                
                </div>
                </div>
                <div className="d-flex justify-content-center" style={{marginTop: 20 + "px"}}>
                    <div className="mx-auto d-block" style={{fontSize: 2 + 'em', color: 'grey'}}>
                  <div className="row">
                    <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="first_name" onChange={this.onChange} name="firstname" value={this.state.firstname} className="validate" />
                        <label htmlFor="first_name" className="active">Firstname</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="last_name" onChange={this.onChange} name="lastname" value={this.state.lastname} className="validate" />
                        <label htmlFor="last_name" className="active">Lastname</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                        <input id="github" onChange={this.onChange} name="github" value={this.state.github ? this.state.github : ""} className="validate" />
                        <label htmlFor="github" className="active">Github Profile</label>
                        </div>
                        <div className="input-field col s4">
                        <input id="linkedin" onChange={this.onChange} name="linkedin" value={this.state.linkedin ? this.state.linkedin : ""} className="validate" />
                        <label htmlFor="linkedin" className="active">Linkedin Profile</label>
                        </div>
                        <div className="input-field col s4">
                        <input id="webpage" onChange={this.onChange} name="webpage" value={this.state.webpage ? this.state.webpage : ""} className="validate" />
                        <label htmlFor="webpage" className="active">Webpage/Blog Url</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="self_intro" name="self_intro" className="materialize-textarea" onChange={this.onChange}
                                value={this.state.self_intro ? this.state.self_intro : ""}></textarea>
                            <label htmlFor="self_intro" className="active">Tell us about yourself!</label>
                        </div>
                    </div>
                    <Row>
                        <Col s={6}>
                        <label htmlFor="skills" style={{fontSize: 12 + "px"}}>Tell us what you'r good at!</label>
                        <input id="skills" onChange={this.onChangeSkills} name="skills" onKeyPress={this.addSkillsToState}
                            value={this.state.currentSkill} className="validate" />
                        </Col>
                        <Col s={6} style={{padding: 10 + "px"}}>
                            {this.state.skills &&
                                this.state.skills.map((skill,idx) =>{
                                    return <Tag key={idx}>{skill.name}</Tag>
                                })
                            }
                        </Col>
                    </Row>
                    </form>
                </div>
                    <Row>
                        <Col s={12}>
                            <button className="btn red lighten-1" onClick={this.onClickSaveProfile}>Save</button>
                        </Col>
                    </Row>
                </div>
                </div>
                </div>
            
        )
    }
}

EditProfile.propTypes = {
    userDetailRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => ({ user: state.userDetailsReducer.user });


export default connect(mapStateToProps, { userDetailRequest })(EditProfile)