import React, { Component } from 'react'
import axios from 'axios';
import { MediaBox, Preloader } from 'react-materialize';

class SolutionDetails extends Component {
    constructor(props) {
        super(props)

        this.onReportSolution = this.onReportSolution.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onDeleteSolution = this.onDeleteSolution.bind(this);

        this.state = {
            solution_imgs: [],
            loading: true,
        }
    }

    componentWillMount() {
        const { id } = this.props.match.params

        axios({
            method: 'get',
            url: '/api/v1/solution_by_id/' + id,
        })
        .then((data) => {
            //put new picture name to state
            this.setState({loading: false});
            this.setState(data.data.solution);
            
        })
        .catch((err) => { console.log(err) });
    }

    onReportSolution(e){
       const {id} = this.state;
       axios({
           method: "post",
           url: "/api/v1/report_solution/" + id,
           headers: {
            'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
       })
       .then(data => {
           debugger;
           this.setState({reported: data.data.reported});
       })
    }

    onDeleteSolution(e) {
        const {id} = this.state;

        axios({
            method: 'post',
            url: '/api/v1/delete_solution/' + id,
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
        })
        .then((data) => {
            this.onBack();
        })
        .catch((err) => { console.log(err) });
    }

    images() {
        this.state.solution_imgs.map((img) => { return `http://localhost:8000/${img.url}` });
    }

    onBack() {
        window.history.go(-1);
    }

    render() {
        const loadingTemplate = 
        (<div className="center-align">
            <div style={{marginTop: 50 + "%"}}>
                <Preloader size='small'/>
            </div>
        </div>
        );
        const SolutionUnderReview = (
            <div className="center-align">
                <div>
                    <i className="large material-icons" style={{color: "#f57c00"}}>warning</i>
                </div>
                <div>
                    This solution is getting reviewed by an admin because it has been reported
                </div>
            </div>
        );
        const SolutonTemplate = (
            <div className="white" style={{ height: 100 + "vh" }}>
                <nav className="navbar navbar-light" style={{ backgroundColor: "#6EC8C8" }}>
                    <form className="form-inline my-2 my-lg-0">
                        <a style={{ cursor: "pointer" }} className="navbar-brand" onClick={this.onBack}>
                            <i className="material-icons">keyboard_arrow_left</i>
                        </a>
                    </form>
                </nav>
                <div className="container">
                    <div className="col s12 m6">
                        <div style={{ marginBottom: 0 + "px" }}>
                            <h2 className="header center blue-grey-text headertext">{this.state.name}</h2>
                            <div className="row">
                                <div className="col s2">
                                    <img src={"http://localhost:8000/" + this.state.pic_url} alt="" className="responsive-img"
                                        style={{ maxHeight: 70 + "vh" }} />
                                </div>
                                <div className="col s10">
                                    <div className="section black-text">
                                        <h5 className="headertext-small">Description</h5>
                                        <span>{this.state.desc}</span>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="section black-text">
                                        <h5 className="headertext-small">TechStack</h5>
                                        <span>{this.state.desc}</span>
                                    </div>
                                    <form className="form-inline my-2 my-lg-0">
                                        <a className="btn-floating btn-large" style={{marginRight: 5 + "px"}}
                                            onClick={this.onDeleteSolution}>
                                            <i className="large material-icons red solution-toolbar-icon-delete">delete_forever</i>
                                        </a>
                                        {
                                        this.state.reported === 0 &&
                                        <a className="btn-floating btn-large" onClick={this.onReportSolution}>
                                            <i className="large material-icons red solution-toolbar-icon-delete">priority_high</i>
                                        </a>
                                        }       
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        {
                            this.state.solution_imgs.map((img, idx) => {
                                return <div key={idx} style={{ margin: 5 + "px" }}
                                    className="col s4"><MediaBox src={`http://localhost:8000/${img.url}`} height="400" /></div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
        return (
            <div>
            {
                this.state.loading ? loadingTemplate : this.state.reported > 0 ? SolutionUnderReview : SolutonTemplate
            }
            </div>
        )
    }
}

export default SolutionDetails;

{/*   */ }

