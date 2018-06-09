import React, { Component } from 'react';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { sortPosts } from '../actions/postAction.js';
import { fetchResults , setDetailedView ,setSortFilter , onSort, checkState } from '../actions/postAction.js'
import {setLocalData} from '../actions/postAction.js';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBarNormal from './NavBarNormal.js';

 class Results extends Component {

    componentWillMount(){
        console.log('COMPONENT IS MOUNTING');
        this.props.checkState();        

        if(this.props.initialQuery===this.props.match.params.id){}
        else{
        this.props.fetchResults(this.props.match.params.id);
        }
        
    }
    componentDidMount(){
      
        let objectToBeInserted = this.props.results;
        console.log(this.props);
        localStorage.setItem('resultData', JSON.stringify(objectToBeInserted));
    }
    componentWillUnmount(){
      this.props.checkState();
    }
    /*onSort=()=>{
      this.props.sortPosts();
      
    }
    
    onSortWatchers=()=>{
      this.props.sortByWatchers();
      
    }
    onSortOwner=()=>{
      this.props.sortByOwner();
    }*/

    onDetail=(e,item)=>{
      this.props.setDetailedView(item);
      console.log(item);
      window.location.href=`/results/${this.props.match.params.id}/detailedView/${item}`;
    }


    handleSort=(e)=>{
      let value=e.target.value;
      this.props.setSortFilter(value);
      this.props.onSort(value);
    }

  componentWillReceiveProps(nextProps){


    this.props.checkState();
    let objectToBeInserted = nextProps.results;

    this.props.setLocalData(objectToBeInserted);

  }


  render() {



    return (
      <div style={{height:'100%',width:'100%'}}>
        <NavBarNormal/>
      <div style={{width:'60%', margin:'0 auto'}}>
        <div className="sortContainer" style={{width:'20%', float:'right'}}>
        <label>Filter by:</label>

          <select className="custom-select custom-select-lg mb-3" value={this.props.sortType || ' ' } onChange={e=>this.handleSort(e)}>
                          <option value=''></option>
                          <option value='stars'>Stars</option>
                          <option value='watchers'>Watchers</option>
                          <option value='owner'>Owner</option>
                          <option value='forks'>Forks</option>
        </select>
        </div>
        <br style={{clear:'right'}}/>
        <div style={{textAlign:'left'}}>
        {(this.props.results && this.props.match.params.id===this.props.initialQuery)
          ?
            <p>{this.props.results.length} Results retrieved</p>
          :
            <p></p>}   
        </div>
        <div style={{width:'100%', margin:'0 auto'}}>{
          
          (this.props.results && this.props.match.params.id===this.props.initialQuery) ?
            <ul className="list-group" style={{textAlign:'left'}}>
              {this.props.results.map((item,i)=>{
                 return (<li className="list-group-item">
                   
                        <div className="headingAndStars">
                         <Link to={`/results/${this.props.match.params.id}/detailedView/${item.id}`}>
                              <strong>{item.full_name}</strong>

                        </Link>
                          <p>      {item.language?<span><i  style={{color:'orange'}} class="fas fa-circle"></i> {item.language}</span>:<span></span>} 
                          <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span> <i class="fas fa-star"></i> {item.stargazers_count} </p>

                        </div>


                        <p style={{fontSize:'14px'}}>{item.owner.login}</p>

                        <p style={{fontSize:'12px',color:'grey'}}>
                          Last updated at {item.updated_at}
                        </p>

                    </li>)
                })
              
              }</ul>
              
              :
              <span>Loading...</span>
          

          }

        </div>

      </div>
      </div>
    )
  }
}



const mapStatetoProps = state=>({
    results:state.posts.results,
    detailedView:state.posts.detailedView,
    sortType:state.posts.sortFilter,
    initialQuery:state.posts.initialQuery
})





export default connect(mapStatetoProps ,
   {fetchResults,setDetailedView,setLocalData,setSortFilter ,onSort , checkState}
  )(Results)