import React, { Component } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

import { fetchResults , checkTest } from '../actions/postAction.js'
import { Link } from 'react-router-dom';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state={
          query:"/"
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

     

    onChange(e){
      this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
      e.preventDefault();
      

      
    }

  render() {
    let url=`/results/${this.state.query}`; 
    

    return (
      <div style={{height:'100%',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
          <div className="col-12 col-sm-10 col-md-6">

            <label>Search Github by Repository Name: </label><br/>

            <div className="input-group">

              <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"  name="query" onChange={this.onChange}/>
              <div className="input-group-append">
                <Link to={url}><button className="btn btn-outline-secondary" type="button"><i className="fas fa-search"></i> 
                   Search</button></Link>
              </div>
            
            </div>
          </div>
      </div>
    )
  }
}

export default  connect (null, {fetchResults , checkTest})(PostForm)