import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SolutionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            desc: "",
            github: "",
            images: []
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    addImageToNewSolution(id){
        let imgData = new FormData();

        this.state.images.map( img => {
            imgData.append("solutionImg",img);
        })

        axios({
            method: 'post',
            url: '/api/v1/solution_upload/' + id,
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token"),
                'content-type': 'multipart/form-data'
            },
            data: imgData
        })
        .then((data) => {
            return data;
        })
        .catch((err) => { console.log(err) });
    }

    onAddImages(e){
        this.setState({ images: Array.from(e.target.files) });
    }

    onPressCreateSolution(e){
        e.preventDefault();
        //this.props.history.push("/my_profile")
        this.props.addSolutionRequest({name: this.state.name, desc: this.state.desc, github: this.state.github})
        .then((data) => {
            const { id } = data.data.success;
            
            return this.addImageToNewSolution(id);
        })
        .then(data => {
            debugger;
        })
    }

  render() {
    return (
        <div className="register-form">
        <div style={{margin: 20 + "px"}}>  
            <div>
                <div className="form-group">
                    <input name="name" className="form-control"
                        onChange={this.onChange}
                        value={this.state.name}
                        placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <textarea name="desc" className="materialize-textarea"
                        onChange={this.onChange}
                        value={this.state.desc}
                        placeholder="Enter description" />
                </div>
                <div className="form-group">
                    <input name="github" className="form-control"
                        onChange={this.onChange}
                        value={this.state.github}
                        placeholder="Enter github repository" />
                </div>
                <div className="file-field input-field">
                    
                        <input name="solutionImg" type="file" multiple onChange={this.onAddImages.bind(this)}/>
                    
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one or more images" />
                    </div>
                 </div>

                <button onClick={this.onPressCreateSolution.bind(this)} className="btn btn-primary">Create</button>
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
