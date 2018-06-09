import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { sortPosts } from '../actions/postAction.js';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";



import PostForm from './Postform.js';
import Results from './Results.js'
import detailedView from './detailedView'




class PostNew extends React.Component{

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

const mapStatetoProps = state=>({
    posts:state.posts.items,
    newPost:state.posts.githubItems
})



export default PostNew;