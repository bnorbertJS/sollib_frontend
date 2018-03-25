import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="white">
                <div className="row" style={{marginLeft: 20 + "px", marginRight: 20 + "px"}}>
                    <div className="col s4">
                        <div className="center-align">
                            <i className="medium material-icons" style={{color: "#ee6e73", margin: 10 + "px"}}>account_circle</i>
                            <h4>Role Based</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Vestibulum sit amet lacus convallis, bibendum dolor in, sollicitudin diam. 
                                Praesent dictum eleifend purus, a maximus sapien fringilla a. Quisque volutpat sapien libero, 
                                vitae lacinia velit malesuada sit amet. Maecenas at facilisis sem, rutrum cursus libero. 
                                Phasellus facilisis egestas euismod. Pellentesque habitant morbi tristique senectus et netus 
                                et malesuada fames ac turpis egestas.</p>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="center-align">
                            <i className="medium material-icons" style={{color: "#ee6e73", margin: 10 + "px"}}>build</i>
                            <h4>Easy to use</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Vestibulum sit amet lacus convallis, bibendum dolor in, sollicitudin diam. 
                                Praesent dictum eleifend purus, a maximus sapien fringilla a. Quisque volutpat sapien libero, 
                                vitae lacinia velit malesuada sit amet. Maecenas at facilisis sem, rutrum cursus libero. 
                                Phasellus facilisis egestas euismod. Pellentesque habitant morbi tristique senectus et netus 
                                et malesuada fames ac turpis egestas.</p>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="center-align">
                            <i className="medium material-icons" style={{color: "#ee6e73", margin: 10 + "px"}}>beenhere</i>
                            <h4>Effective</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Vestibulum sit amet lacus convallis, bibendum dolor in, sollicitudin diam. 
                                Praesent dictum eleifend purus, a maximus sapien fringilla a. Quisque volutpat sapien libero, 
                                vitae lacinia velit malesuada sit amet. Maecenas at facilisis sem, rutrum cursus libero. 
                                Phasellus facilisis egestas euismod. Pellentesque habitant morbi tristique senectus et netus 
                                et malesuada fames ac turpis egestas.</p>
                        </div>
                    </div>
                </div>
                    <div className="parallax" style={{height: 40 + "vh"}}> </div>
                </div>
        )
    }
}
