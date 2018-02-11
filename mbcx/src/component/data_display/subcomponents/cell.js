import React from 'react';



class Cell extends React.Component{
  render(){
  /*
props:
      data - the data point for this cell to be displayed
      col - the column number this cell belongs too
      row - row number for this cell


*/

    if( typeof this.props.data === 'string' ){
    var cell_data = new Date(this.props.data)
    }
    else{
      var cell_data = this.props.data;
    }


  return (<td  className={'column' + this.props.col + ' ' + 'row'+ this.props.row+ ' cell'}>{ cell_data instanceof Date? cell_data.toUTCString(): cell_data}</td>)
  }
}

export default Cell;
