import React from 'react';
import Cell from './cell';
import HeaderCell from './headercell';


class Row extends React.Component{

  /*
props:
      sort - a function to sort the table by a selected column to be passed to headercell
      data - an object where the keys are the header labels for the table
      row - this row number
      head - a boolean representing whether or not this is header row

*/

  render(){
    //used for inner js functions
    var self = this;
    var keyCell = 0;
    var keyHeader = 0;

    var params = Object.keys(this.props.data)
    //map the data object keys to the header cells of the table
    var headers = Object.keys(this.props.data).map(function(head){
        keyHeader++;
        return <HeaderCell select={self.props.select} len={params} row={self.props.row} col={keyHeader} data={self.props.data[head]}/>    });
    //map the data to the table cells
    var cells = Object.keys(self.props.data).map(function(dat){
      keyCell++;
    return <Cell len={params} row={self.props.row} col={keyCell} data={self.props.data[dat]}/>
    });
    //conditional render for header cell vs table cell
    if(this.props.head){
      return(
      <tr className={'head' + this.props.row}>{headers}</tr>
    )

    }

    else{
    return(
      <tr className={'row' + this.props.row}>{cells}</tr>
    )

    }
  }
}


export default Row;
