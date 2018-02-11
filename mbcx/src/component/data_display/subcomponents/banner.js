import React from 'react';

import Breakdown from './breakdown';

class Banner extends React.Component{

 /*
props:
      breakdown- a list of props for the breakdown component
      title  - title of the table (equipment id)
      data - data retrieved from the server

*/
  render(){

    let date1 = this.props.data[0]["DateTimeStamp"].slice(0,- 1)
    let date2 = this.props.data[this.props.data.length-1]["DateTimeStamp"].slice(0,-1)
    return(
    <div id='title-banner'>
        <div id='config'>
          <Breakdown selected={this.props.breakdown[0]} colData={this.props.breakdown[1]} datetime={this.props.breakdown[2]} />
          <div id='date-container'>
            <form id="dates">
              Start Date:<br/>
              <input type="datetime-local" defaultValue={date1}/><br/>
              End Date:<br/>
              <input type="datetime-local" defaultValue={date2}/><br/>
              <br/>
              <input id="query" type="submit"/>
            </form>
          </div>
        </div>
        <h1 id='title-text'>{this.props.title}</h1>
    </div>
    )
  }
}

export default Banner;
