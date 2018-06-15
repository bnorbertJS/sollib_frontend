import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div style={{backgroundColor: "#0C576E"}}>
                <div className="row" style={{marginLeft: 20 + "px", marginRight: 20 + "px"}}>
                    <div className="col s4">
                        <div className="center-align">
                            <i className="medium material-icons" style={{color: "#FFF", marginTop: 20 + "px"}}>account_circle</i>
                            <h4 style={{color: "#FFF", marginBottom: 20 + "px", fontSize: 24 + "px"}}>Role Based</h4>
                            <p style={{color: "#FFF", margin: 10 + "px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Vestibulum sit amet lacus convallis, bibendum dolor in, sollicitudin diam. 
                                Praesent dictum eleifend purus, a maximus sapien fringilla a. Quisque volutpat sapien libero,.</p>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="center-align">
                            <i className="medium material-icons" style={{color: "#FFF", marginTop: 20 + "px"}}>build</i>
                            <h4 style={{color: "#FFF", marginBottom: 20 + "px", fontSize: 24 + "px"}}>Easy to use</h4>
                            <p style={{color: "#FFF", margin: 10 + "px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Vestibulum sit amet lacus convallis, bibendum dolor in, sollicitudin diam. 
                                Praesent dictum eleifend purus, a maximus sapien fringilla a. Quisque volutpat sapien libero, 
                                vitae lacinia velit malesuada</p>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="center-align">
                            <i className="medium material-icons" style={{color: "#FFF", marginTop: 20 + "px"}}>beenhere</i>
                            <h4 style={{color: "#FFF", marginBottom: 20 + "px", fontSize: 24 + "px"}}>Effective</h4>
                            <p style={{color: "#FFF", margin: 10 + "px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Vestibulum sit amet lacus convallis, bibendum dolor in, sollicitudin diam. 
                                Praesent dictum eleifend purus, a maximus sapien fringilla a. Quisque volutpat sapien libero, 
                                vitae lacinia velit.</p>
                        </div>
                    </div>
                </div>
                    <div className="parallax" style={{height: 40 + "vh"}}> </div>
                </div>
        )
    }
}
