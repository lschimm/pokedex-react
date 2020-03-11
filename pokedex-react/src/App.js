import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import NavBar from "./components/layout/NavBar"

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    )
  }
}
