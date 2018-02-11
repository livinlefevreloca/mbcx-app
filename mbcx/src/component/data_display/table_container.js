import React from 'react';
import Table from './subcomponents/table';
import Banner from './subcomponents/banner';
import './data.css';
var axios = require('axios');

class TableContainer extends React.Component{

  /*constructor:
          allStates:
                retrieved - data to be displayed in the table
                sortedBy - column number the table is sorted by
                winHeight - the height of the window used to determine the tables height



  */
  constructor(props){
    super(props);
    this.state = {
      retrieved: [],
      order: 0,
      selected: 'DateTimeStamp',
      selectedData: [],
      isloaded: false,
      isupdated: false
    }
    this.selectColumn  = this.selectColumn.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }


  componentWillMount(){
    //get the current selected piece of equipment
    let equip = localStorage.current;
    //get address associated with user
    let address = localStorage.address;
    //get root url
    const root = 'https://mbcx-server.herokuapp.com/';
    //get equip data from server
    window.fetch(root + 'equipquery?equipment=' + equip + '&address=' + address)
      .then(res => res.json())
        .then((data) =>{
          //make array of data in selected column
          var selectedCol = []
          for(var i  = 1; i < data.length; i ++){
              selectedCol.push(data[i][this.state.selected])
          }
          //make array of data in date column
          var dateCol = [];
          for(var i  = 1; i < data.length; i ++){
              dateCol.push(data[i]['DateTimeStamp']);
          }
          this.setState({retrieved: data, selectedData: selectedCol, dateData: dateCol, isloaded: true} );

        });

}




   componentDidUpdate(){
    //checks if app has finished loading before setting up various event listners and functions
    if(this.state.isloaded){
    var that = this;
    //find a range to be used in rendering so the whole table doesnt need to be rendered at once
    function findRange(viewpoint, height){
      var bottom = viewpoint < 10 ?  0: viewpoint-10
      var top = viewpoint + 10 > height? height: viewpoint + 10
    if (top == height){
      bottom -= (height - viewpoint)
    }
    else if(bottom == 0){
      top += 10 + bottom;
    }
      return [bottom, top];
    }
    //checks if the app has already been updated before
    if(!this.state.isupdated){
    //function to resize a table on screen change
    function tableResize(){
      var w = window;
      var d = document;
      var t = document.getElementById('title-banner');
      var e= d.documentElement;
      var g = d.getElementsByTagName('body')[0];
      var y = w.innerHeight|| e.clientHeight|| g.clientHeight;
      var y_1 = t.innerHeight || t.clientHeight;
      var viewWindowHeight = y - y_1;
      that.setState({winHeight: viewWindowHeight, isupdated: true})
    }
    // keeps top row at the top while scrolling and the left(date) row stationary while scrolling
    function scrollCorrection() {
      document.getElementsByTagName('thead')[0].style.top = (this.scrollTop+3) +'px';
      var col1 = document.getElementsByClassName('column1');
      var position = this.scrollTop;
      var viewpoint = Math.ceil(position/94);
      var range = findRange(viewpoint, col1.length)

      col1[0].style.left = (this.scrollLeft) + 'px';
      for(var i = range[0]; i < range[1]; i++){
        col1[i].style.left = (this.scrollLeft) + 'px';

      }

    }
    //function to request data from the server(form handler)
    function submitQuery(e){
      let form = document.getElementById('dates')
      e.preventDefault();
      let date1 = form.elements[0].value;
      let date2 = form.elements[1].value;
      that.setState({isloaded: false, isupdated: false})
      that.updateTable(date1, date2);
  }

  //event listeners to execute the functions above
  document.getElementById('view-window').addEventListener('scroll', scrollCorrection);
  document.getElementById('query').addEventListener('click', submitQuery);
  window.addEventListener('resize', tableResize);
  tableResize();
  }
}
}
 //updates table using the date inputs
 updateTable(date1, date2){
   let equip = localStorage.current;
   const root = window.location.protocol + '//' + window.location.hostname + ':3001/';
   let url = root + 'equipquery?equipment=' + equip + '&begin=' + date1 + "&end=" + date2 + '&address=' + localStorage.address;
   //save the dates to be compared with data returned from the server
   localStorage.begin =  date1;
   localStorage.end = date2
   window.fetch(url)
   .then(res => res.json())
     .then((data) =>{
       var selectedCol = []
           for(var i  = 1; i < data.length; i ++){
             selectedCol.push(data[i][this.state.selected])
       }
       var dateCol = [];
       for(var i  = 1; i < data.length; i ++){
             dateCol.push(data[i]['DateTimeStamp']);
       }
       this.setState({retrieved: data, selectedData: selectedCol, dateData: dateCol, isloaded: true} );

     });
 }


 selectColumn(e){
   //get column name
   var col = e.target.innerHTML;
   //full retrieved data to be sorted
   var colData = this.state.retrieved;

    if(col === "Date Time Stamp"){
    //if column is the date column sort the forwards than backwards and select this column
    var check = this.state.order;
    colData.sort(function(item1, item2){
      let date1 = new Date(item1['DateTimeStamp'])
      let date2 = new Date(item2['DateTimeStamp'])
      if( check == 0){
        return date2 - date1;
      }
      else{
        return date1 - date2;
      }


      });
      var selectedCol = []
      for(var i  = 1; i < colData.length; i ++){
         col =col.split(' ').join('')
         selectedCol.push(colData[i][col])
       }
     this.setState({retrieved: colData, order: Math.abs(check - 1), selectedData: selectedCol, selected: col});
    }
    else{
      //select this column
       var selectedCol = []
        for(var i  = 1; i < colData.length; i ++){
          col =col.split(' ').join('')
          selectedCol.push(colData[i][col])

    }
      this.setState({selected: col, selectedData: selectedCol})
    }

  }



  render(){
    //sets the height of the table to the window height - the banner height or zero if not yet retrieved
    var winStyle = {height: this.state.winHeight || 0};
    //loading component
    if(!this.state.isloaded){
      return(<h1> Loading...</h1>)
    }

    return(
    <div id='table-container'>
        <div id='overAllScore'></div>
        <Banner data={this.state.retrieved} breakdown={[this.state.selected, this.state.selectedData, this.state.dateData]} title={localStorage.title} />
        <div style={winStyle} id="view-window">
        <Table select={this.selectColumn} head={false} data={this.state.retrieved}  />
        </div>
    </div>
    )
  }

}

export default TableContainer;
