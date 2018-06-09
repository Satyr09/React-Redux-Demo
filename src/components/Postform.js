import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {fetchResults , checkTest} from '../actions/postAction.js'
import {Router, Route, Link} from 'react-router-dom';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state={
          query:"/"
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

// Results url setting - > use reducer

     

    onChange(e){
      this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
      e.preventDefault();
      
//      this.props.fetchResults(this.state.query);
      //this.props.checkTest();
     // window.location.href=`/results/${this.state.query}`;

      
    }

  render() {
    let url=`/results/${this.state.query}`; 
    

    return (
      <div style={{height:'100%',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
          <div style={{width:'30%'}}>

            <label>Repository Name: </label><br/>

            <div className="input-group">

              <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"  name="query" onChange={this.onChange}/>
              <div class="input-group-append">
                <Link to={url}><button class="btn btn-outline-secondary" type="button">Search</button></Link>
              </div>
            
            </div>
          </div>
      </div>
    )
  }
}


PostForm.propTypes={
  createPost: PropTypes.func.isRequired
}
export default  connect (null, {fetchResults , checkTest})(PostForm)