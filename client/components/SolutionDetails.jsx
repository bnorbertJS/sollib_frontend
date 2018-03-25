import React, { Component } from 'react'
import axios from 'axios';

class SolutionDetails extends Component {
    constructor(props) {
        super(props)
        this.onBack = this.onBack.bind(this);
        this.onDeleteSolution = this.onDeleteSolution.bind(this);
        this.state = {
            solution_imgs: []
        }
    }

    componentDidMount() {
        //init carousel
        $('.carousel').carousel();

        const {id} = this.props.match.params
        
        axios({
            method: 'get',
            url: '/api/v1/solution_by_id/' + id,
        })
        .then((data) => {
            //put new picture name to state
            this.setState(data.data.solution);
            
        })
        .catch((err) => { console.log(err) });

    }

    onDeleteSolution(){
        debugger;
    }
    
    onBack(e){
        window.history.go(-1);
    }
    
    render() {
        return (
           
            <div className="red darken-1" style={{height: 100 + "vh"}}>
                    <nav className="navbar navbar-light red lighten-2">
                        <form className="form-inline my-2 my-lg-0">
                            <a style={{cursor: "pointer"}} className="navbar-brand" onClick={this.onBack}>
                            <i className="material-icons">keyboard_arrow_left</i>
                            </a>
                        </form>

                        <form className="form-inline my-2 my-lg-0">
                            <a className="btn-floating btn-large" onClick={this.onDeleteSolution}>
                                <i className="large material-icons red solution-toolbar-icon-delete">delete_forever</i>
                            </a>
                        </form>
                    </nav>
                
                <div className="col s12 m6 offset-m2 l6 offset-l3">
                    <div className="card-panel grey lighten-5 z-depth-1" style={{marginBottom: 0 + "px"}}>
                    <h2 className="center-align">{this.state.name}</h2>
                    <div className="row valign-wrapper">
                        <div className="col s2">
                        <img src={"http://localhost:8000/" + this.state.pic_url} alt="" className="responsive-img" 
                            style={{maxHeight: 70 + "vh"}}/>
                        </div>
                        <div className="col s10">
                        <div className="section black-text">
                            <h5>Description</h5>
                            <span>{this.state.desc}</span>
                        </div>
                        <div className="divider"></div>
                        <div className="section black-text">
                            <h5>TechStack</h5>
                            <span>{this.state.desc}</span>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                
                <div className="row valign-wrapper">
                        {/* carousel */}
                        
                </div>

            </div>
        )
    }
}

export default SolutionDetails;