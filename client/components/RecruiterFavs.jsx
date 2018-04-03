import React, { Component } from 'react';
import {Col, Preloader, ProgressBar, Row, Badge, Icon, Button, Chip, Collection, CollectionItem} from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class RecruiterFavs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favs: [],
            isloading: true,
            selectedFav: false,
            selectedFavObj: null,
            messageText: "",
            currentMessages: []
        }

        this.onChangeMessageText = this.onChangeMessageText.bind(this);
        this.onSendMessageToUser = this.onSendMessageToUser.bind(this);
        this.onClickChatPartner = this.onClickChatPartner.bind(this);
    }

    componentDidMount(){
       
    }

    componentWillMount(){
        axios({
            method: "get",
            url: "/api/v1/get_favs",
            headers:{
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
        })
        .then( favs => {
            this.setState({ favs: favs.data.favList, isloading: false })
        })
    }

    onClickChatPartner(e){
        const { username } = e.target.dataset;
        this.setState({selectedFavObj: null, currentMessages: []});
       
        axios({
            method: "get",
            url: "/api/v1/profile/" + username,
            headers:{
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
        })
        .then( user => {
            const { id } = user.data.user;
            this.setState({
                selectedFav: true,
                selectedFavObj: user.data.user
            })

            return axios({
                method: "get",
                url: "/api/v1/get_msg/" + id,
                headers:{
                    'x-sollib-token': localStorage.getItem("x-sollib-token")
                }
            })
        })
        .then((msgs) => {
            this.setState({ currentMessages: msgs.data.messages})
        })
    }

    onChangeMessageText(e){
        this.setState({messageText: e.target.value})
    }

    onSendMessageToUser(e){
        const { id } = this.state.selectedFavObj;
        const { messageText } = this.state;
       
        axios({
            method: "post",
            url: "/api/v1/send_msg",
            headers:{
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            },
            data: {user_id: id, text: messageText, seen: 0}
        })
        .then( msg => {
            this.setState({
                currentMessages: [...this.state.currentMessages, msg.data.msg],
                messageText: ""
            })
        })
    }
    
    render() {
        const favListComponent = (
            <div>
                <Collection header="Contacts" className="chat-list">
                <div style={{height: 84 + "vh", overflowY: "auto"}}>
                {
                    this.state.favs.map((fav, idx) => {
                    return (
                        <CollectionItem className="contact-item"
                            onClick={this.onClickChatPartner} key={idx}
                            style={{padding: 0, border: "none", cursor: "pointer"}}>
                            <Row className="valign-wrapper left-aligned">
                                <Col s={3} data-username={fav.username}>
                                    <img style={{height: 2 + "rem", width: 2 + "rem"}} 
                                        src={fav.profile_pic ? 
                                                    `http://localhost:8000/${fav.profile_pic}`
                                                    : "http://localhost:8000/user.png"} alt="avatar" className="circle" />
                                </Col>
                                <Col s={9} data-username={fav.username}>
                                    {fav.username}<br />
                                    {fav.email}
                                </Col>
                            </Row>    
                        </CollectionItem>
                    )
                })
                }
                </div>
                </Collection>
            </div>
        )

        return (
            <div>
                <Row>
                    <Col s={4}>
                    {
                        !this.state.isloading ?
                            favListComponent
                        :
                        (
                            <div style={{height: 5 + "px"}}>
                                <Col s={12}>
                                    <ProgressBar/>
                                </Col>
                            </div>
                        )
                    }
                    </Col>
                    <Col s={8}>
                        {
                            !this.state.selectedFav ?
                                <div style={{marginTop: 30 + "vh"}} className="center-align">
                                    <div>
                                        <i className="large material-icons" style={{color: '#b2ebf2'}}>info_outline</i>
                                    </div>
                                    <div >
                                        Select someone from the left, and send messages to them.
                                    </div>
                                </div>
                            :
                                this.state.selectedFavObj !== null ?
                                    <Collection className="chat-messages"
                                        header={this.state.selectedFavObj.firstname}>
                                        <div id="chat-body" style={{height: 70 + "vh", overflowY: "auto"}}>
                                            {
                                            this.state.currentMessages.map((msg, idx) => {
                                                    
                                            return (
                                                <CollectionItem key={idx}
                                                    style={{border: "none"}}>
                                                    <div
                                                    className={"chatmessage-bubble " + (this.props.user.id === msg.from ? "goto-right" : "")}>
                                                        <span>
                                                            {msg.text}
                                                        </span>
                                                        <br />
                                                        <span style={{fontSize: 12 + "px"}}>
                                                            {msg.created_at}
                                                        </span>
                                                    </div>
                                                </CollectionItem>
                                                    )
                                                })
                                            }
                                        </div>
                                        <CollectionItem>
                                            <div className="align-center messageinput-button">
                                             <Row className="align-center" style={{padding: 0, margin: 0}}>
                                                <Col s={10} style={{padding: 0, margin: 0}}>
                                                <textarea  onChange={this.onChangeMessageText} value={this.state.messageText}
                                                    style={{resize: "none", padding: 0, margin: 0, height: 100 + "%"}} 
                                                    rows="2" placeholder="Type a message ..."/>
                                                </Col>
                                                <Col s={2} style={{padding: 0, margin: 0}}>
                                                    <Button style={{height: 100 + "%", width: 100 + "%", padding: 0, margin: 0}}
                                                        className="red darken-1" onClick={this.onSendMessageToUser}>Send</Button>
                                                </Col>
                                            </Row>
                                            </div>
                                        </CollectionItem>
                                    </Collection>
                            :
                            
                            <div className="center-align">
                                <div style={{marginTop: 50 + "%"}}>
                                    <Preloader size='small'/>
                                </div>
                            </div>
                        }
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

RecruiterFavs.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => ({
    user:  state.userDetailsReducer.user
});

export default connect(mapStateToProps,{  })(RecruiterFavs);

{/*
<div className="card red lighten-2 chatWindow">
                                    <div className="card-content white-text" style={{height: 10 + "vh"}}>
                                        <span className="card-title">Chat</span>
                                    </div>
                                    <div className="message-content white">
                                        <div style={{padding: 10 + "px", 
                                            width: 20 + "%", 
                                            backgroundColor: "#90caf9", borderRadius: 10 + "%", whiteSpace: "pre-wrap"}}>
                                           Hallo
                                        </div>
                                        <div className="right-align">
                                            <Chip>Message1</Chip>
                                        </div>
                                        <div>
                                            <Chip>Message1</Chip>
                                        </div>
                                    </div>
                                    <div className="card-action message-input">
                                        <div className="form-group">
                                            <Row>
                                                <Col s={10} style={{marginRight:0, paddingRight: 0}}>
                                                    <textarea style={{resize: "none"}} placeholder="Type a message ..."
                                                        className="form-control input-msg" rows="5"></textarea>
                                                </Col>
                                                <Col s={2} style={{marginLeft: 0, paddingLeft: 0}}>
                                                    <Button style={{height: 100 + "%"}}>Send</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                                className={(this.props.user.id === msg.from ? "goto-right" : "")}
*/}
