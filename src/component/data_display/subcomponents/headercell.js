import React from 'react';


class HeaderCell extends React.Component{
/*
props:
      sort - a function to sort the table by a selected column to be for onClick
      data - the data label for this header cell
      col - the column number this cell belongs too
      row - header row
*/

render(){
  //add a space for all capital letters in the columns titles
  var content = this.props.data.replace(/([A-Z]+)/g, ' $1').trim();

  return( <th id={this.props.data} onClick={this.props.select}  className={'column' + this.props.col + ' '  + 'row' + this.props.row + ' headcell'}>{content}</th>);
}
}


export default HeaderCell;
