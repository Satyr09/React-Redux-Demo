import React, { Component } from 'react';

import { connect } from 'react-redux';
//import { PropTypes } from 'prop-types';

import { fetchResults , setDetailedView ,setSortFilter , onSort, checkState } from '../actions/postAction.js'
import {setLocalData} from '../actions/postAction.js';

import { Link } from "react-router-dom";
import NavBarNormal from './NavBarNormal.js';
import LanguageChart from './languageChart.js';

import colorData from '../colors.json';

 class Results extends Component {

    componentWillMount(){
        this.props.checkState();        


        /*

          A new fetch request is made only when a new query is executed,
          otherwise data from store is utilised

        */


        if(this.props.initialQuery===this.props.match.params.id){}
        else{
        this.props.fetchResults(this.props.match.params.id);
        }
        
    }
    componentDidMount(){
      
        let objectToBeInserted = this.props.results;
        localStorage.setItem('resultData', JSON.stringify(objectToBeInserted));

        /*

          After each search the corresponding data is set in localstorage until a new search is executed.
          This allows us to retrieve data from localstorage in the detailedView page

        */

    }
    componentWillUnmount(){
      this.props.checkState();
    }

    onDetail=(e,item)=>{
      this.props.setDetailedView(item);
      window.location.href=`/results/${this.props.match.params.id}/detailedView/${item}`;
    }


    handleSort=(e)=>{
      let value=e.target.value;
      this.props.setSortFilter(value);  //retains the sort value when we return from the detail view page
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
      <div className="col-10 offset-1" >
        <div className="sortContainer col-10 col-sm-6 col-md-3" style={{float:'right'}}>
        <label>Sort  by:</label>

          <select className="custom-select  mb-3" value={this.props.sortType || ' ' } onChange={e=>this.handleSort(e)}>
                          <option value=''></option>
                          <option value='best_match'>Best Match</option>
                          <option value='stars'>Stars</option>
                          <option value='watchers'>Watchers</option>
                          <option value='owner'>Owner</option>
                          <option value='forks'>Forks</option>
        </select>
        </div>
        <br style={{clear:'right'}}/>



        <div className="row">

        <div className="col-md-4 col-12"> 
          <LanguageChart languageObject={this.props.languageObject} />
        </div>

        <div className="col-md-8 col-12" >
          <div style={{textAlign:'left'}}>
              {(this.props.results && this.props.match.params.id===this.props.initialQuery)
                ?
                  <p>{this.props.results.length} Results retrieved</p>
                :
                  <p></p>}   
            </div>
          
          {

          
          (this.props.results && this.props.match.params.id===this.props.initialQuery) ?
            <ul className="list-group" style={{textAlign:'left'}}>
              {this.props.results.map((item,i)=>{

                /*
                  Fetching each language's corresponsing color as per Github's usage

                */
                var colorStyle={}
                 if(colorData[item.language]){
                 let color=colorData[item.language].color;
                 
                 if(color){colorStyle={color:color}}}

                 return (<li key={i} className="list-group-item">
                   
                        <div className="headingAndStars row">
                          <div className="col-12 col-md-6">
                            <Link to={`/results/${this.props.match.params.id}/detailedView/${item.id}`}>
                                  <strong>{item.full_name}</strong>

                            </Link>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                           {item.language?<span><i  style={colorStyle} className="fas fa-circle"></i> {item.language}</span>:<span></span>}
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                          <span><i className="fas fa-star"></i> {item.stargazers_count}</span>
                        </div>
                         
                        </div>


                        <p style={{fontSize:'14px'}}>{item.owner.login}</p>

                        <p style={{fontSize:'12px',color:'grey'}}>
                          Last updated at {item.updated_at.substr(0, item.updated_at.indexOf('T'))}
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
      </div>
    )
  }
}

const mapStatetoProps = state=>({
    results:state.posts.results,
    detailedView:state.posts.detailedView,
    sortType:state.posts.sortFilter,
    initialQuery:state.posts.initialQuery,
    languageObject:state.posts.languageObject
})

export default connect(mapStatetoProps ,
   {fetchResults,setDetailedView,setLocalData,setSortFilter ,onSort , checkState}
  )(Results)