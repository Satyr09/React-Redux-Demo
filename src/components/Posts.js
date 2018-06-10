import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";



import PostForm from './Postform.js';
import Results from './Results.js'
import detailedView from './detailedView'




class PostNew extends Component{

render(){
    return(
        <Router>
            <div style={{height:'100%'}}>
            <Route exact path="/" component={PostForm}/>

            <Route path="/results/:data/detailedView/:id" component={detailedView}/>
             <Route exact path="/results/:id" component={Results}/>  
 
            </div>
        </Router>
    )
}
}



export default PostNew;