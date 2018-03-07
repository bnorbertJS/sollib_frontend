import React from 'react';
import Login from './Login.jsx';
import Header from './Header.jsx';
import Sections from './Sections.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        <Header />
        <Sections />
        <Footer />
      </div>
      );
  }
}