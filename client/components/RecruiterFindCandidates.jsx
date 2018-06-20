import React, { Component } from 'react';
import {Collapsible, CollapsibleItem, Input, Icon, Row,
         Button, Col, ProgressBar, Badge, MediaBox} from 'react-materialize';
import axios from 'axios';

export default class RecruiterFindCandidates extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            searchValue: "",
            users: []
        }

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onClickSolutionItem = this.onClickSolutionItem.bind(this);
    }

    componentWillMount(){
        this.getUsers()
            .then(users => {
                this.setState({users: users.data.userList, isLoading: false})
            });
    }

    onClickSolutionItem(e){
        e.preventDefault();
        this.props.history.push("/solution_details/" + e.target.dataset.id);
    }

    getUsers(){
        return axios({
            method: 'get',
            url: '/api/v1/get_users',
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
        })
    }

    onSearchChange(e){
       //if(e.target.value.length > 2){
            this.setState({searchValue: e.target.value})
        //}
    }

    renderList(users){
        let userIterate = users.length === 0 && this.state.searchValue.length === 0 ? this.state.users : users;
        
        return (
            userIterate.map((user, idx) => {
                return (
                    <CollapsibleItem key={idx} header={user.username} icon='person_outline'>
                        <Badge>{user.solutions.length} solution</Badge>
                        <div className="section">
                                <h6>Self introduction</h6>
                                <div className="divider"></div>
                                <p>{user.self_intro}</p>
                        </div>
                        
                        <div className="section">
                            <h6>Skills</h6>
                                <div className="divider"></div>
                            {
                                user.skills.map((item,idx) =>{
                                    return <span className="chip skill-tag-smaller" key={idx}>{item.name}</span>
                                })
                            }
                        </div>
                        
                        <div className="section">
                            <h6>Solutions</h6>
                            <div className="divider"></div>
                            {
                            user.solutions.map((solution,idx) => {
                                return (
                                        <img className="responsive-img circle" key={idx}
                                            style={{cursor: "pointer", height: 150 + "px", width: 150 + "px"}}
                                            data-id={solution.id}
                                            src={`http://localhost:8000/${solution.pic_url}`}
                                            onClick={this.onClickSolutionItem}
                                            />
                                )
                            })
                            }
                        </div>
                    </CollapsibleItem>
                )
            })
        )
    }

    render() {
        return (
            <div className="container searchCandidates">
                <Row className="valign-wrapper">
                    <Input s={6} label="Search for candidates..." validate onChange={this.onSearchChange}><Icon>search</Icon></Input>
                </Row>
                {
                    !this.state.isLoading ? (
                        <Collapsible popout style={{whiteSpace: "pre-wrap", backgroundColor: "#FFF"}}>
                        {
                            this.renderList(this.state.users.filter(user => {
                                return user.username.toLowerCase().indexOf(this.state.searchValue.toLocaleLowerCase()) !== -1 ||
                                        this.state.searchValue.toLocaleLowerCase().indexOf(user.username.toLowerCase()) !== -1
                            }))
                        }
                        </Collapsible>
                    ) : (
                        <div style={{height: 5 + "px"}}>
                            <Col s={12}>
                                <ProgressBar/>
                            </Col>
                        </div>
                    )
                }
            </div>
        )
    }
}
