import React, { Component } from 'react'
import SolutionForm from './SolutionForm.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addSolutionRequest} from '../actions/UserDetailAction';

class NewSolution extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (
            <div>
                <div className="register-page">
                    <div className="d-flex justify-content-center">
                        <div className="mx-auto d-block" style={{fontSize: 2 + 'em', color: 'grey'}}>
                            Create a Solution !
                        </div>
                    </div>

                    <SolutionForm addSolutionRequest={this.props.addSolutionRequest}/>
                </div>
            </div>
        )
    }
}

NewSolution.propTypes = {
    addSolutionRequest: PropTypes.func.isRequired
}

export default connect(null,{ addSolutionRequest })(NewSolution);