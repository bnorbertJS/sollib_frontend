import React, { Component } from 'react';
import {Col, Preloader, ProgressBar, Row, Badge, Icon, Button, Chip, Collection, CollectionItem} from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class UserMessages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
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
            url: "/api/v1/get_user_contacts",
            headers:{
                'x-sollib-token': localStorage.getItem("x-sollib-token")
            }
        })
        .then( contacts => {
            this.setState({ contacts: contacts.data.contactList, isloading: false })
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
            <div className="sollib-box" style={{height: 100 + "vh", overflowY: "auto", margin: 0, backgroundColor: "#2c3e50"}}>
             <div className="favListHeader">Contacts</div>
                <ul className="chat-list">
                <div>
                   
                {
                    this.state.contacts.map((contact, idx) => {
                    return (
                        <CollectionItem className="contact-item"
                            onClick={this.onClickChatPartner} key={idx}
                            style={{padding: 0, border: "none", cursor: "pointer", backgroundColor: "#2c3e50", color: "#FFF"}}>
                            <Row className="valign-wrapper left-aligned">
                                <Col s={3} data-username={contact.username}>
                                    <img style={{height: 2 + "rem", width: 2 + "rem"}} 
                                        src={contact.profile_pic ? 
                                                    `http://localhost:8000/${contact.profile_pic}`
                                                    : "http://localhost:8000/user.png"} alt="avatar" className="circle" />
                                </Col>
                                <Col s={9} data-username={contact.username}>
                                    {contact.firstname} {contact.lastname}<br />
                                    <span style={{fontSize: 14 + "px"}}>{contact.company}</span>
                                </Col>
                            </Row>
                        </CollectionItem>
                    )
                })
                }
                </div>
                </ul>
            </div>
        )

        return (
            <div>
                <Row style={{marginBottom: 0}}>
                    <div className="favlist-container">
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
                    </div>
                    <div className="chatContainer">
                        {
                            !this.state.selectedFav ?
                                <div style={{marginTop: 30 + "vh"}} className="center-align">
                                    <div>
                                        <i className="large material-icons" style={{color: '#b2ebf2'}}>info_outline</i>
                                    </div>
                                    <div style={{color: "#FFF"}}>
                                        Select someone from the left, and send messages to them.
                                    </div>
                                </div>
                            :
                                this.state.selectedFavObj !== null ?
                                <div className="sollib-box" style={{height: 100 + "vh", overflowY: "hidden", margin: 0}}>
                                    <div className="favListHeader">{this.state.selectedFavObj.firstname}</div>
                                    <ul className="chat-messages">
                                        <div id="chat-body">
                                            {
                                            this.state.currentMessages.map((msg, idx) => {
                                                    
                                            return (
                                                <CollectionItem key={idx}
                                                    style={{border: "none"}}>
                                                    <div
                                                    className={"teal accent-4 chatmessage-bubble " + (this.props.user.id === msg.from ? "goto-right" : "")}>
                                                        <span>
                                                            {msg.text}
                                                        </span>
                                                        <br />
                                                        <span className="goto-right-msg" style={{fontSize: 12 + "px", marginTop: 5 + "px"}}>
                                                            {msg.created_at.split("T")[1].split(":")[0] + ":" + msg.created_at.split("T")[1].split(":")[1]}
                                                        </span>
                                                    </div>
                                                </CollectionItem>
                                                    )
                                                })
                                            }
                                        </div>
                                    </ul>
                                    
                                            <div className="messageinput-button" style={{width: 100 + "%"}}>
                                                <Row style={{padding: 0, margin: 0}}>
                                                    <Col s={10} style={{padding: 0, margin: 0}}>
                                                    <textarea  className="form-control" onChange={this.onChangeMessageText} value={this.state.messageText}
                                                        style={{resize: "none", padding: 0, margin: 0, height: 100 + "%"}} 
                                                        rows="2" placeholder="Type a message ..."/>
                                                    </Col>
                                                    <Col s={2} style={{padding: 0, margin: 0}}>
                                                        <Button style={{height: 100 + "%", width: 100 + "%", padding: 0, margin: 0}}
                                                            className="teal accent-4" onClick={this.onSendMessageToUser}>Send</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        
                                    </div>
                            :
                            
                            <div className="center-align">
                                <div style={{marginTop: 50 + "%"}}>
                                    <Preloader size='small'/>
                                </div>
                            </div>
                            
                        }
                        
                    </div>
                </Row>
            </div>
        )
    }
}
UserMessages.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => ({
    user:  state.userDetailsReducer.user
});

export default connect(mapStateToProps,{  })(UserMessages);
