import React, { Component } from 'react'
import {  Link } from "react-router-dom";

export default class NavBar extends Component {

    
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
