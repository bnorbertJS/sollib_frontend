import React, { Component } from 'react';
import {Button, Row, Input, Icon} from 'react-materialize';

export default class RecruiterMatch extends Component {
  render() {
    return (
        <div style={{height: 100 + "vh"}} className="center-align">
            <div style={{paddingTop: 10 + "%"}}>
                <div className="container">
                    <Row>
                        <Input s={6} label="What skills do you look for?" validate><Icon>search</Icon></Input>
                    </Row>
                </div>
                <img className="responsive-img" src="http://localhost:8000/user.png" />
                
                <div className="row">
                    <div className="col s6 m6 l6">
                        <Button style={{borderRadius: 50 + "%", height: 5 + "rem", width: 5 + "rem"}}
                            large className='green' icon='check' />
                    </div>
                    <div className="col s6 m6 l6">
                        <Button style={{borderRadius: 50 + "%", height: 5 + "rem", width: 5 + "rem"}}
                            large className='red' icon='close' />
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
  }
}
