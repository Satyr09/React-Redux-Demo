import React from 'react';

import { connect } from 'react-redux';

import { checkState , fetchTopics } from '../actions/postAction.js'


import NavBar from './NavBar.js';

import colorData from '../colors.json';


class detailedView extends React.Component{
  
      constructor(props){
          super(props);
          this.state={data:{}};
      }
      componentWillMount(){
          console.log("MOUNTING");
  
          let checkId=this.props.match.params.id;

          let data={};
  
          let retrievedItem=JSON.parse(localStorage.getItem('resultData'));

          console.log(retrievedItem);



        /*

            Retrieving corresponding entry from localStorage

        */
  
  
          if(retrievedItem){
          retrievedItem.forEach(function(element) {
              let tempElem=''+element.id
              if(tempElem===checkId){
                  data=element;
                  console.log('FOUND IN LS');
                  
              }
              
          }, this);}

          /*

            Once initial retrieval from local storage is done,
            data that was not included in the initial response from github API
            such as Topics/Language color is fetched
          */
  
          this.setState({data}, ()=>{this.colorSetter();this.props.fetchTopics({owner:data.owner.login,name:data.name})});
  
  
      }

  
      componentDidMount(){
        this.props.checkState();
        
      }



      /*

        Sets color according to major language with data from colors.json

     */


      colorSetter=()=>{
        if(colorData[this.state.data.language]){

            let color=colorData[this.state.data.language].color;
            this.setState({colorStyle:{color:color}})
        }
        else{
            this.setState({colorStyle:{}})
        }

      }
      render(){
          
     return (
      
        <div>
            <NavBar url={`/results/${this.props.match.params.data}`}/>
            



            <div className="card boxShadow col-10 col-md-6 offset-1 offset-md-3" style={{padding:'0',marginTop:'10%',marginBottom:'5%'}}>
                <div className="card-header" style={{padding:'20px'}}>
                    {this.state.data.full_name}
                </div>
                <div className="card-body" style={{textAlign:'left'}}>
                    <p>{this.state.data.description}</p>
                    {this.state.data.homepage?<p><a href={this.state.data.homepage} target="blank">Visit website</a><br/></p>:<p style={{fontSize:'12px'}}>No Website Found</p>}

                    {this.props.topics?this.props.topics.map((item,i)=>{
                        return <span className="badge badge-primary" style={{marginRight:'5px'}}> {item} </span>
                    }):<p></p>}
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4 ">
                            <i className="fas fa-eye"></i> {this.state.data.watchers_count}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <i className="fas fa-star"></i> {this.state.data.stargazers_count}
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <i className="fas fa-code-branch"></i> {this.state.data.forks}
                        </div>
                    </div>
                    <br/>
                    <p>Owner : {this.state.data.owner.login}</p>

                    
                    <p>{
                          this.state.data.language?<span>Language : <i  style={this.state.colorStyle} class="fas fa-circle"></i> {this.state.data.language}</span>:
                          <span></span>
                        }
                    </p>

                    <p>{this.state.data.license?<span><i className="fas fa-balance-scale"></i> {this.state.data.license.name}</span>:<span/>} </p>                
                    
                    <p>{this.state.data.open_issues_count>0?<span>
                        {this.state.data.open_issues_count} open issues</span>:<span>No open issues</span>}</p>
            
            
                    <p>Last Updated at : {this.state.data.updated_at.substr(0,this.state.data.updated_at.indexOf('T'))}</p>

                    
                    <a href={`https://github.com/${this.state.data.owner.login}/${this.state.data.name}`} target="blank" className="btn btn-primary">
                        Find this on &nbsp; <i class="fab fa-github"></i></a>

                </div>
            </div>
        </div>
     )
  
  
  }
  }
  

const mapStatetoProps = state=>({
    results:state.posts.results,
    topics:state.posts.topics
})



export default connect(mapStatetoProps , { checkState,fetchTopics})( detailedView)

