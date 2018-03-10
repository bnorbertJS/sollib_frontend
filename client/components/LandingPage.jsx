import React, { Component } from 'react'
import Header from './Header.jsx';
import Sections from './Sections.jsx';
import Footer from './Footer.jsx';

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sections />
        <Footer />
      </div>
    )
  }
}
