import React, { Component } from 'react';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { checkState } from '../actions/postAction.js'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from './NavBar.js';


class detailedView extends React.Component{
  
      constructor(props){
          super(props);
          this.state={data:{}};
      }
      componentWillMount(){
  

          let checkId=this.props.match.params.id;

          let data={};
  
          let retrievedItem=JSON.parse(localStorage.getItem('resultData'));

          console.log(retrievedItem);
  
  
  
          if(retrievedItem){
          retrievedItem.forEach(function(element) {
              console.log(element.id)
              if(element.id==checkId){
                  data=element;
                  console.log('FOUND');
              }
              
          }, this);}
  
          this.setState({data}, ()=>console.log('state change happened'));
  
  
      }

      componentDidMount(){
        this.props.checkState();
        
      }
  
      render(){
          
      return (
      
      <div>
          <NavBar url={`/results/${this.props.match.params.data}`}/>
        



        <div class="card boxShadow" style={{width:'50%',margin:'0 auto',marginTop:'10%'}}>
            <div class="card-header">
                 {this.state.data.full_name}
            </div>
            <div class="card-body" style={{textAlign:'left'}}>
                <p>Stars : {this.state.data.stargazers_count}</p>
                
                <p>Forks : {this.state.data.forks}</p>
                
                <p>Language : {this.state.data.language}</p>
                
                <p>Watching : {this.state.data.watchers_count}</p>
          
                <p>Owner : {this.state.data.owner.login}</p>
          
                <p>Open Issues : {this.state.data.open_issues_count}</p>
          
          
                <p>Last Updated at : {this.state.data.updated_at}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        </div>
      )
  
  
  }
  }
  

const mapStatetoProps = state=>({
    results:state.posts.results
})



export default connect(mapStatetoProps , { checkState})( detailedView)

