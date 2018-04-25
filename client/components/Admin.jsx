import React, { Component } from 'react';
import {Collapsible, CollapsibleItem, Input, Icon, Row, Collection, CollectionItem, Table,
  Button, Col, Chip, ProgressBar, Badge, MediaBox, CardPanel, Tabs, Tab} from 'react-materialize';
import {isEmpty} from 'lodash';
import axios from 'axios';

class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchUser: "",
      searchedUser: null,
      reportedSolutions: []
    }

    this.onClickDeleteUser = this.onClickDeleteUser.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  onSearchChange(e){
    this.setState({searchUser : e.target.value})
  }

  onClickSearch(e){
    axios({
        method: 'get',
        url: '/api/v1/get_user_by_names/' + this.state.searchUser,
        headers: {
            'x-sollib-token': localStorage.getItem("x-sollib-token")
        }
    })
    .then(u => {
      this.setState({searchedUser: u.data.user})
    })
    .catch(u => {
      this.setState({searchedUser: {}})
    })
  }

  onClickDeleteUser(){
    axios.delete("/api/v1/delete_user",{
      data: {id: "8043e8af-e973-4b20-a09c-8045a9ac7e10"}
    })
    .then(succ => {
      this.setState({searchedUser: null, searchUser: ""});
    })
  }

  onBack() {
    window.history.go(-1)
  }

  renderListSolutons(){
    return (<div>
      <Table className="centered" centered striped hoverable>
  <thead>
    <tr>
      <th data-field="solution" style={{fontWeight: "bold"}}>Solution</th>
      <th data-field="uploader" style={{fontWeight: "bold"}}>Uploader</th>
      <th data-field="actions" style={{fontWeight: "bold"}}>Actions</th>
    </tr>
  </thead>
  
  <tbody>
    <tr style={{padding: 5 + "px"}}>
      <td>solution #2</td>
      <td>csitika</td>
      <td>
        <a className="btn-floating btn-small waves-effect waves-light green"><i className="material-icons">check</i></a>
        <a className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">delete</i></a>
      </td>
    </tr>
    <tr style={{padding: 5 + "px"}}>
      <td>solution #2</td>
      <td>csitika</td>
      <td>
        <a className="btn-floating btn-small waves-effect waves-light green"><i className="material-icons">check</i></a>
        <a className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">delete</i></a>
      </td>
    </tr>
  </tbody>
</Table>
    </div>)
  }

  renderUserCard(){
    return (<div>
      <CardPanel className="white cardAdmin" style={{paddingBottom: 1 + "px", marginBottom: 0, marginTop: 10 + "px"}}>
                      <Row>
                          <Col s={4}>
                              <img className="responsive-img"
                                  src={this.state.searchedUser.profile_pic ? 
                                      `http://localhost:8000/${this.state.searchedUser.profile_pic}`
                                      : "http://localhost:8000/user.png"}/>
                          </Col>
                          <Col s={6}>
                              <Row>{this.state.searchedUser.username}</Row>
                              <Row>{`${this.state.searchedUser.lastname} ${this.state.searchedUser.firstname}`}</Row>
                              <Row>{this.state.searchedUser.email}</Row>
                          </Col>
                          <Col s={2}>
                            <a className="btn-floating btn-large red right-align" onClick={this.onClickDeleteUser}>
                                <i className="large material-icons">delete</i>
                            </a>
                          </Col>
                      </Row>
                      <Tabs>
                        <Tab title="Solutions" style={{padding: 5 + "px"}}>
                        {
                              this.state.searchedUser.solutions.map((solution,idx) => {
                                  return (
                                      <img className="responsive-img circle" key={idx}
                                          style={{cursor: "pointer", height: 150 + "px", width: 150 + "px"}}
                                          src={`http://localhost:8000/${solution.pic_url}`}
                                          onClick={this.onClickSolutionItem}
                                          />
                                  )
                              })
                          }
                        </Tab>
                      </Tabs>
                  </CardPanel>
    </div>);
  }
  
  render() {
    
    const notFoundUserCard = (<div className="center-align" style={{margin: 10 + "px"}}>User not found</div>);
    const noReportedSolutions = (<div className="center-align" style={{margin: 10 + "px"}}>0 reported solutions yet.</div>)

    return (
      <div>
        <nav className="navbar navbar-light" style={{ backgroundColor: "#6EC8C8" }}>
            <form className="form-inline my-2 my-lg-0">
                <a style={{ cursor: "pointer" }} className="navbar-brand" onClick={this.onBack}>
                    <i className="material-icons">keyboard_arrow_left</i>
                </a>
            </form>
        </nav>
      <div style={{margin: 10 + "px"}}>
        <div className="sollib-section">
              <div className="sollib-section-header">
                <p>Reported solutions</p>
                <hr />
              </div>
              <div className="selfintro-box">
                {
                  this.state.reportedSolutions.length <= 0 ? noReportedSolutions : this.renderListSolutons()
                }
              </div>
        </div>

        <div className="sollib-section">
              <div className="sollib-section-header">
                <p>Inactive users</p>
                <hr />
              </div>
              <div className="selfintro-box">
              sec box
              </div>
        </div>

        <div className="sollib-section">
              <div className="sollib-section-header">
                <p>Search for users</p>
                <hr />
              </div>
              <div className="selfintro-box">
                <Row className="valign-wrapper">
                    <Input label="Search for users..." value={this.state.searchUser} onChange={this.onSearchChange}></Input>
                </Row>
                <div className="center-align">
                  <Button waves='light' onClick={this.onClickSearch}>Search</Button>
                </div>
              </div>
              <div className="sollib-section-result">
                {
                 this.state.searchedUser === null 
                  ? <div></div> 
                  : isEmpty(this.state.searchedUser) ? notFoundUserCard : this.renderUserCard()
                }
              </div>
        </div>

        <div className="sollib-section">
              <div className="sollib-section-header">
                <p>Registration problems</p>
                <hr />
              </div>
              <div className="selfintro-box">
              fourth box
              </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Admin;