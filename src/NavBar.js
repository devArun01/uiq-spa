import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';

class NavBar extends React.Component {
  render() {
    return (
      <Route
        children={({ history, match, location }) => {
          const props = {
            history, match, location
          }
          return <NavWithProps {...props} />
        }}
      />
    )
  }
}

class NavWithProps extends React.Component {
  render() {
    const { history, location: { pathname } } = this.props
    return (
      <div className="NavBar">
        <button onClick={() => { history.push('/') }} style={{ color: pathname === '/' ? 'turquoise' : 'white' }}>Home</button>
        <button onClick={() => { history.push('/about') }} style={{ color: pathname === '/about' ? 'turquoise' : 'white' }}>About</button>
        <button onClick={() => { history.push('/users') }} style={{ color: pathname === '/users' ? 'turquoise' : 'white' }}>Users</button>
      </div>
    )
  }
}

export default NavBar;

