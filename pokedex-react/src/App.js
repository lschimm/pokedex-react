import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard'
import backgroundImage from './components/img/pattern.png'

export default class App extends Component {
  render() {
    return (
      <div className="App" style={{background: `url(${backgroundImage})`}}>
        <NavBar />
        <div className="container">
          <Dashboard />
        </div>
      </div>
    )
  }
}
