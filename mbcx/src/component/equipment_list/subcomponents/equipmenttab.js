import React from 'react';



class EquipmentTab extends React.Component{
  /*
  props:
        -handleClick: function to run when tab is clicked
        -name: the tab name to displayed
        -clicked: is the tab clicked? determies the style of the tab
  
  */
  
  render(){
    //style created inline as it is dependent on the clicked prop
    var tabStyle = {
             height: '100%',
             backgroundColor: this.props.clicked? '#d1d1d1' : 'white',
             margin: '0 0 0 -2px',
             border: '2px solid black',
             borderBottom: 'none',
             
             padding: '5px 20px 5px 20px',
             borderRadius: '5px 5px 0 0',
             display: 'inline',
             width: '10%'
          };
    return(
    <li style={tabStyle} className={"equipment-tab"} >
        <a id={this.props.name} onClick={this.props.handleClick} href="#">{this.props.name}</a>
      </li>
    );
  }
}


export default EquipmentTab;