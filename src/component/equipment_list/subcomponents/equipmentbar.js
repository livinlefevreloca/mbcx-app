import React from 'react';
import EquipmentTab from './equipmenttab';


class EquipmentBar extends React.Component{
  /*
  props:
        -handleClick: function to run when tab is clicked
        -clickedTab: a string representing the name of the currently clicked tab
        -equipment:  the types of equipment included on the equipment bar
  
  */
  render(){ 
   
    //map the list of the types of equipment to a list of equipmentTab components
    var self = this;
    var tabs = this.props.equipment.map((equipId) =>{
     let clicked  = equipId === self.props.clickedTab;
      return( <EquipmentTab handleClick={self.props.handleClick} clicked={clicked} name={equipId}/>);
     
      
    });
                              
      return(
    <ul className={"equipment-bar"}>
        {tabs}
    </ul>
      
    );
  }
}

export default EquipmentBar;