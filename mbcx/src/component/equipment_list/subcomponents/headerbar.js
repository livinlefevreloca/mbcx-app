import React from 'react';
import EquipmentBar from './equipmentbar';


class HeaderBar extends React.Component{
   /*props:
          -equipment: An object with keys equal to the type of equipment. Each key points to list of the equipment of that type 
          -clicked: A string equal to the name of the currently clicked tab
          -clickTab: a function to handle a tab being clicked
          */
  render(){
    var equipmentTypes = Object.keys(this.props.equipment);
    return(
    <div id='navbar'>
       <EquipmentBar equipment={equipmentTypes} clickedTab={this.props.clicked} handleClick={this.props.clickTab}/> 
        </div>
    );
  }
  
}


export default HeaderBar;