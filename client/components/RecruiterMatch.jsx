import React, { Component } from 'react';
import {Button, Row, Input, Icon, Tag, Chip, Col, CardPanel, Collapsible, CollapsibleItem, Toast} from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class RecruiterMatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchSkills: [],
            searchValue: "",
            users: null,
        }

        this.onClickLike = this.onClickLike.bind(this);
        this.onClickDislike = this.onClickDislike.bind(this);
        this.onClickFindCandidates = this.onClickFindCandidates.bind(this);
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.onChangeSearchSkills = this.onChangeSearchSkills.bind(this);
        this.onDeleteChips = this.onDeleteChips.bind(this);
    }

    onChangeSearchSkills(e){
        if (e.key === 'Enter' && e.target.value !== "") {
            this.setState({
                searchSkills: [...this.state.searchSkills, e.target.value],
                searchValue: ""
            })
        }
    }

    onChangeSearchInput(e){
        this.setState({searchValue: e.target.value})
    }

    onClickFindCandidates(e){
        axios({
            method: 'post',
            url: '/api/v1/lets_tinder',
            headers: {
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            },
            data: {searchSkills: this.state.searchSkills}
        })
        .then( users => {
            this.setState({ users: users.data.userList })
        });
    }

    onDeleteChips(e){
        const { value } = e.target.dataset;
        let filteredArray = this.state.searchSkills.filter(x => { return x !== value })
        this.setState({
            searchSkills:  filteredArray
        });
    }

    onClickLike(){
        axios({
            method: "post",
            url: "/api/v1/addto_fav",
            headers:{
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            },
            data: {who: this.state.users[0].id, recruiter_id: this.props.user.id}
        })
        .then( res => {
            this.state.users.shift();
            let a = this.state.users;
            this.setState({
                users: a
            });
        })
    }

    onClickDislike(){
        this.state.users.shift();
        let a = this.state.users;
        this.setState({
            users: a
        });
    }

    render() {
        const cantFindUsers = (
            <div>Oh noo :( We couldnt find users that is a match</div>
        )

        const searchSkillsProvided = (
            <div>
            <div>
                {
                    this.state.searchSkills.map((skill,idx) => {
                        return (
                            <div className="chip" key={idx}>
                                {skill}
                                <i onClick={this.onDeleteChips} data-value={skill} className="close material-icons">close</i>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        )

        const tinderComponent = this.state.users !== null && this.state.users.length !== 0 ? (
            <div>
                <div>
                    <CardPanel className="white" style={{paddingBottom: 1 + "px", marginBottom: 0}}>
                        <Row>
                            <Col s={4}>
                                <img className="responsive-img"
                                    src={this.state.users[0].profile_pic ? 
                                        `http://localhost:8000/${this.state.users[0].profile_pic}`
                                        : "http://localhost:8000/user.png"}/>
                            </Col>
                            <Col s={8}>
                                <Row>{this.state.users[0].username}</Row>
                                <Row>{`${this.state.users[0].lastname} ${this.state.users[0].firstname}`}</Row>
                                <Row>{this.state.users[0].email}</Row>
                            </Col>
                        </Row>
                        <Collapsible accordion>
                            <CollapsibleItem header='Self intro' icon='filter_drama'>
                                {this.state.users[0].self_intro}
                            </CollapsibleItem>
                            <CollapsibleItem header='Skills' icon='place'>
                                <Row>
                                {
                                    this.state.users[0].skills.map( (skill, idx) => {
                                        return (
                                            <Chip key={idx}>
                                                {skill.name}
                                            </Chip>
                                        )
                                    })
                                }
                                </Row>
                            </CollapsibleItem>
                            <CollapsibleItem header='Solutions' icon='whatshot'>
                            {
                                this.state.users[0].solutions.map((solution,idx) => {
                                    return (
                                        <img className="responsive-img circle" key={idx}
                                            style={{cursor: "pointer", height: 150 + "px", width: 150 + "px"}}
                                            src={`http://localhost:8000/${solution.pic_url}`}
                                            onClick={this.onClickSolutionItem}
                                            />
                                    )
                                })
                            }
                            </CollapsibleItem>
                        </Collapsible>
                        <Row>
                            <Button style={{width: 50 + "%"}}
                                onClick={this.onClickLike}
                                large waves='light'
                                className='green'>
                                <Icon center>check</Icon></Button>
                            <Button style={{width: 50 + "%"}}
                                onClick={this.onClickDislike}
                                large waves='light'
                                className='red'>
                                <Icon center>close</Icon></Button>
                        </Row>
                    </CardPanel>
                    
                </div>
            </div>
        ) : <div></div>

        return (
            <div style={{marginTop: 10 + "px"}}>
                <Row>
                    <Col s={4}>
                        <Row className="center-align">
                            <Input label="What skills do you look for?" validate
                                onChange={this.onChangeSearchInput} 
                                value={this.state.searchValue}
                                onKeyPress={this.onChangeSearchSkills}>
                            </Input>
                        </Row>
                        <Row className="center-align">
                            <Button small="true" onClick={this.onClickFindCandidates} className='green'>Search</Button>
                        </Row>
                        <Row>
                            {searchSkillsProvided}
                        </Row>
                    </Col>
                    <Col s={8}>
                        <div className="container center-align">
                        {
                            this.state.users === null ? <div>Press the search button to start matching with candidates</div> 
                                                      : this.state.users.length === 0 ? cantFindUsers 
                                                      : tinderComponent
                                
                        }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

RecruiterMatch.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => ({
    user:  state.userDetailsReducer.user
});

export default connect(mapStateToProps,{  })(RecruiterMatch);