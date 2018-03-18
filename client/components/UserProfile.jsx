import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userDetailRequest, addSolutionRequest } from '../actions/UserDetailAction';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.getUser = this.props.userDetailRequest.bind(this);

        this.state = {
            user: this.getUser(),
            solutionsLength: 0
        }

        this.onClickAddSolution = this.onClickAddSolution.bind(this);
        this.onClickEditProfile = this.onClickEditProfile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ solutionsLength: nextProps.user.solutions.length, user: nextProps.user })
    }

    onClickAddSolution(e){
        this.props.history.push("/new_solution");
    }

    onClickEditProfile(e){
        this.props.history.push("/edit_profile");
    }

    render() {
        const solutionExists = this.state.solutionsLength === 0 ? false : true;

        const SolutionTemplate = !solutionExists ? (
            <div className="d-flex justify-content-center align-items-center flex-column" 
                style={{backgroundColor: 'lightgrey', height: 15 + 'rem'}}>
                You don't have any solutions yet.
                <div>
                    <button onClick={this.onClickAddSolution} className="transparent-btn">
                    <span className="fas fa-plus-circle" 
                        style={{cursor: 'pointer', fontSize: 3 + 'em', color: 'white', margin: 0.4 + 'em'}}></span>
                    </button>
                    
                </div>
            </div> 
        ) :

        (
                <div className="row card-deck">
                {
                    this.props.user.solutions.map((item, idx) => {
                        return (
                            <div className="col" key={idx}>
                            <div className="card medium mx-auto d-block">
        <div className="card-image">
          <img src="https://source.unsplash.com/random"/>
          <span className="card-title">{item.name}</span>
          
        </div>
        <div className="card-content">
          <p>{item.desc}</p>
        </div>
      </div>
      </div>

                            
                        )
                    })
                }
            
            </div>
        )
        const picUrl = this.state.user.profile_pic === undefined || this.state.user.profile_pic === null ? "user.png" : this.state.user.profile_pic
        const ProfilePicTemplate =
        (
            <img src={"http://localhost:8000/" + picUrl}
                style={{width: 2.5 + "em", height: 2.5 + "em", borderRadius: 50 + "%"}}/>
        )

        return (
            <div className="userprofile">
                <button className="transparent-btn" onClick={this.onClickEditProfile}>
                    <span className="fas fa-edit edit-icon"
                            style={{opacity: 0.5, cursor: 'pointer', fontSize: 30 + 'px', color: 'grey'}}></span>
                </button>
                <div className="d-flex justify-content-center">
                    <div className="mx-auto d-block" style={{fontSize: 5 + 'em', color: 'grey', margin: 0.2 + 'em'}}>
                        {ProfilePicTemplate}
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

                <div>
                    <nav className="navbar navbar-light bg-light">
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>

                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-outline-dark my-2 my-sm-0" onClick={this.onClickAddSolution}>Create</button>
                        </form>
                    </nav>
                    {SolutionTemplate}
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
