import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class NavBar extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
        <nav  className="navbar navbar-dark bg-dark">
           <span style={{height:'100%',textDecoration:'none'}}><Link to={this.props.url}> 
                <span style={{color:'white'}}>Back</span>
            </Link></span>
        </nav>
    )
  }
}
