import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userDetailRequest, addSolutionRequest } from '../actions/UserDetailAction';
import {Chip} from 'react-materialize';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.getUser = this.props.userDetailRequest.bind(this);

        this.state = {
            user: this.getUser(),
            solutionsLength: 0
        }

        this.onClickMessages = this.onClickMessages.bind(this);
        this.onClickAddSolution = this.onClickAddSolution.bind(this);
        this.onClickEditProfile = this.onClickEditProfile.bind(this);
        this.onClickSolutionDetails = this.onClickSolutionDetails.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ solutionsLength: nextProps.user.solutions.length, user: nextProps.user })
    }

    onClickAddSolution(e){
        this.props.history.push("/new_solution");
    }

    onClickSolutionDetails(e){
        this.props.history.push("/solution_details/" + e.currentTarget.dataset.id);
    }

    onClickEditProfile(e){
        this.props.history.push("/edit_profile");
    }

    onClickMessages(e){
        this.props.history.push("/user_messages");
    }

    render() {
        const solutionExists = this.state.solutionsLength === 0 ? false : true;

        const SolutionTemplate = !solutionExists ? (
            <div className="center-align" style={{paddingTop: 5 + '%'}}>
                You don't have any solutions yet.
                <div>
                    <i className="large material-icons">sentiment_dissatisfied</i>
                </div>
            </div>
        ) :

        (
                <span style={{width: 280 + "px"}}>
                {
                    this.props.user.solutions.map((item, idx) => {
                        return (
                            <div key={idx} style={{width: 280 + "px", margin: 0}}>
                            <div className="card small">
                                <div className="card-image">
                                    <img src={"http://localhost:8000/" + item.pic_url}/>
                                    <span className="card-title">{item.name}</span>
                                    
                                </div>
                                <div className="card-content">
                                <p>{item.desc}</p>
                                </div>
                                <div className="card-action">
                                    <a href="#">Github</a>
                                    <a style={{cursor: "pointer"}} onClick={this.onClickSolutionDetails} data-id={item.id}>Details</a>
                                </div>
                            </div>
                            </div>

                            
                        )
                    })
                }
                </span>
        )
        const picUrl = this.state.user.profile_pic === undefined || this.state.user.profile_pic === null ? "user.png" : this.state.user.profile_pic
        const ProfilePicTemplate =
        (
            <img src={"http://localhost:8000/" + picUrl}
                style={{width: 2 + "em", height: 2 + "em", borderRadius: 50 + "%"}}/>
        )
        
        const github = this.state.user.github ? (<a href={this.state.user.github}><i style={{height: 2.5 + "em", width: 2.5 + "em", padding: 0.5 + "em", color: "#212529"}} className="fab fa-github"></i></a>) : (<div></div>);
        const linkedin = this.state.user.linkedin ? (<a href={this.state.user.linkedin}><i style={{height: 2.5 + "em", width: 2.5 + "em", padding: 0.5 + "em", color: "#212529"}} className="fab fa-linkedin"></i></a>) : (<div></div>);
        const webpage = this.state.user.webpage ? (<a href={this.state.user.webpage}><i style={{height: 2.5 + "em", width: 2.5 + "em", padding: 0.5 + "em", color: "#212529"}} className="fa fa-link"></i></a>) : (<div></div>);

        const self_intro = this.state.user.self_intro ? (<div className="self-intro">{this.state.user.self_intro}</div>) : (<div></div>);

        return (
            <div className="userprofile">
            <div className="red lighten-2 sollib-section" style={{marginBottom: 10 + "px"}}>
                <a className="btn-floating btn-large red chat-icon" onClick={this.onClickMessages}>
                    <i className="large material-icons">message</i>
                </a>
                <a className="btn-floating btn-large red edit-icon" onClick={this.onClickEditProfile}>
                    <i className="large material-icons">mode_edit</i>
                </a>
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 5 + 'em', color: 'grey', margin: 0.2 + 'em', marginBottom: 0}}>
                        {ProfilePicTemplate}
                    </div>
                </div>
                
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 3 + 'em'}}>
                            {this.props.user.username}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="mx-auto">
                            {github}{linkedin}{webpage}
                    </div>
                </div>
                </div>
                <div className="sollib-section">
                    <nav className="navbar navbar-light bg-light">
                        <h3 style={{color: "black", fontSize: 32 + "px"}}>Self intro</h3>
                    </nav>
                    <div className="selfintro-box">
                    {self_intro}
                    </div>
                </div>
                <div className="sollib-section">
                    <nav className="navbar navbar-light bg-light">
                        <h3 style={{color: "black", fontSize: 32 + "px"}}>TechStack</h3>
                    </nav>
                    <div className="skills-box">
                        {this.state.user.skills &&
                            this.state.user.skills.map((item,idx) =>{
                                return <span className="chip skill-tag" key={idx}>{item.name}</span>
                            })
                        }
                    </div>
                </div>
                <div className="sollib-section">
                    <nav className="navbar navbar-light bg-light">
                        <h3 style={{color: "black", fontSize: 32 + "px"}}>Solutions</h3>

                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-outline-dark my-2 my-sm-0" onClick={this.onClickAddSolution}>Create</button>
                        </form>
                    </nav>
                    <div className="solution-box">
                    {SolutionTemplate}
                    </div>
                </div> 
            </div>
        )
    }
}

UserProfile.propTypes = {
    userDetailRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    addSolutionRequest: PropTypes.func.isRequired
}

const mapStateToProps = ( state ) => ({
    user:  state.userDetailsReducer.user
});

export default connect(mapStateToProps,{ userDetailRequest, addSolutionRequest })(UserProfile);