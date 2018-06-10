import React, { Component } from 'react';

export default class LanguageChart extends Component {


  render() {
    return (
      <div>

        <ul className="list-group" style={{marginBottom:'30px'}}>
            {this.props.languageObject?
                <li style={{backgroundColor:'#f1e6e6'}}className="list-group-item">
                    Major languages detected :
                </li>:<span/>
            }

            {this.props.languageObject?
              Object.keys(this.props.languageObject).map((key,i)=>{

                return <li key={i} className="list-group-item">
                        {key} : {this.props.languageObject[key]}
                      </li>
             }):<p></p>}
        </ul>
      </div>
    )
  }
}
