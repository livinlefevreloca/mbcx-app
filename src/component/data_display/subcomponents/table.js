import React from 'react';
import Row from './row';


class Table extends React.Component{
  /*
props:
      sort - a function to sort the table by a selected column to be passed to Row component
      data - a list of objects containing the data for each row


*/

  render(){
    //used for inner js functions
    var self = this;
    var tableKey = 0;
    var headerKey = 0
    //maps the objects keys to header row
    var headerRows = [Object.keys(this.props.data[1])].map(function(head){

      headerKey++;
      return <Row select={self.props.select} head={true} data={head} row={headerKey}/>
    });
    //map the row objects to the rows
    var rows = this.props.data.map(function(rowData){

      tableKey++;
      return <Row head={false} data={rowData} row={tableKey} />
               })
    var style = {'display': 'block'}
    return(
    <table  id="data-table">
        <thead>
          {headerRows}
        </thead>

        <tbody style={style}>

      {rows}
        </tbody>
    </table>

    )
  }

}

export default Table;
