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
        this.setState({ solutionsLength: nextProps.user.solutions.length })
    }

    onClickAddSolution(e){
        this.props.history.push("/new_solution");
    }

    onClickEditProfile(e){
        debugger;
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
            <div className="d-flex justify-content-center" >
            <div className="card-deck">
                {
                    this.props.user.solutions.map((item, idx) => {
                        return (
                            <div className="card mx-auto no-padding-top" key={idx}>
                                <img className="card-img-top" src="https://source.unsplash.com/random" alt="Card image cap" />
                                <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.desc}</p>
                                </div>
                                <div className="card-footer text-muted">
                                <small className="text-muted">{item.updated_at}</small>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        )


        return (
            <div className="userprofile">
                <span className="fas fa-edit edit-icon" onClick={this.onClickEditProfile}
                        style={{opacity: 0.5, cursor: 'pointer', fontSize: 30 + 'px', color: 'grey'}}></span>
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

                <div>
                    <nav className="navbar navbar-light bg-light">
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-dark my-2 my-sm-0">Search</button>
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
