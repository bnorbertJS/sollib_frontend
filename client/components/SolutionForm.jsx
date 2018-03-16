import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class SolutionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            desc: "",
            pic_url: "",
            score: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onPressCreateSolution(e){
        e.preventDefault();
        this.props.addSolutionRequest(this.state).then((data) => this.props.history.push("/my_profile"));
    }

  render() {
    return (
        <div className="register-form">
        <div className="d-flex justify-content-center">
            <div className="mx-auto d-block">
            <div className="col col-lg-12">
                <div className="form-group">
                    <input name="name" className="form-control"
                        onChange={this.onChange}
                        value={this.state.name}
                        placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <input name="desc" className="form-control"
                        onChange={this.onChange}
                        value={this.state.desc}
                        placeholder="Enter description" />
                </div>
                <div className="form-group">
                    <input name="score" className="form-control"
                        onChange={this.onChange}
                        value={this.state.score}
                        placeholder="Enter score" />
                </div>
                <div className="form-group">
                    <input name="pic_url" type="email" className="form-control"
                        onChange={this.onChange}
                        value={this.state.pic_url}
                        placeholder="Enter picture url" />
                </div>
                <button onClick={this.onPressCreateSolution.bind(this)} className="btn btn-primary">Create</button>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

SolutionForm.propTypes = {
    addSolutionRequest: PropTypes.func.isRequired
}

export default withRouter(SolutionForm);
