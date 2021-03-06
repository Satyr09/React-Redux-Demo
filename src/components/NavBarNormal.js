import React, { Component } from 'react'

export default class NavBarNormal extends Component {

  render() {
    return (
        <nav  className="navbar lowPad navbar-dark bg-dark" style={{marginBottom:'40px'}}>
           <span style={{height:'100%',textDecoration:'none'}}>
                <span style={{color:'white'}}>

                    <img alt="React Logo" style={{height:'40px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"/>
                        +
                    <img  alt="Redux Logo" style={{height:'50px'}} src="https://cdn-images-1.medium.com/max/312/1*SRL22ADht1NU4LXUeU4YVg.png"/>    
                </span>
            </span>
        </nav>
    )
  }
}
