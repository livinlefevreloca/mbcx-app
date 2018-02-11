import React from 'react';
import {Link,} from 'react-router-dom'



class Jumbotron extends React.Component{
  /*props:
          -equipment: An object with keys equal to the type of equipment. Each key points to list of the equipment of that typ
          -clicked: A string equal to the name of the currently clicked tab
          */

  render(){
    //map the selected tabs equipment list to a list of li elements to be displayed
    var content = this.props.equipment[this.props.clicked].map((unit) => {
      let link = '/equipment/' + unit;
      return(<li id={unit}><Link to={link}>{unit}</Link></li>);
    });
    //retrieves the number of types of equipment
    var linkCount = this.props.equipment[this.props.clicked].length;
    //determines the number to divide into the link count multiples of 15
    var columnDiv = Math.ceil(linkCount/100)*15;
    //number of columns
    var columns = Math.ceil(linkCount/columnDiv);
    //changes the style for the number of columns
    var listStyle = {
    WebkitColumnCount: columns,
    MozColumnCount: columns,
    columnCount: columns,
    };
    //changes the content div width to fix column spacing dependent on the number of columns
    var contentStyle = {
      width: (columns*10).toString() + '%'
    };

    return(
      <div id="jumbotron">
        <div style={contentStyle} className='content'>
          <ul style={listStyle} id="equipment-list">
            {content}
          </ul>
        </div>

        </div>
    );
  }
}

export default Jumbotron;
