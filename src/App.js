import React from 'react';
import './App.css';
import NavBar from './NavBar'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Users from './Users'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          SINGLE PAGE APP
        </header>
        <div style={{ display: 'flex' }}>
          <NavBar />
          <Switch>
            <Route path="/" exact render={props => <Home {...props} />} />
            <Route path="/about/" exact render={props => <About {...props} />} />
            <Route path="/users/" exact render={props => <Users {...props} />} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
