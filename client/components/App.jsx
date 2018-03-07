import React from 'react';
import Login from './Login.jsx';
import Header from './Header.jsx';
import Sections from './Sections.jsx';
import Footer from './Footer.jsx';
import UserProfile from './UserProfile.jsx';


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