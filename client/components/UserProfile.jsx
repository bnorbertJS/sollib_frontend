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
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ solutionsLength: nextProps.user.solutions.length })
    }

    onClickAddSolution(e){
        console.log(this.props.user.solutions.length)
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
                            <div className="card" key={idx}>
                                <img className="card-img-top" src="https://source.unsplash.com/random" alt="Card image cap" />
                                <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.desc}</p>
                                <p className="card-text"><small className="text-muted">{item.updated_at}</small></p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        )

        /*const solutionTemplate = (
            <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: 'lightgrey', height: 15 + 'rem'}}>
                <ul>
                    <li></li>
                </ul>
            </div>
        )*/

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
                
                {SolutionTemplate}
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
