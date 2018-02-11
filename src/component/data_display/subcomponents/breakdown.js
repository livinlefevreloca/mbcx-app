import React from 'react';

class Breakdown extends React.Component{
  /*
  props:
    selected - the column name to breakdown
    colData - column data
    datetime - the datetime data
    */

  render(){
    //find the min, max and average for the data in the selected column to be displayed in the breakdown
    function min_max_av(dates, datas){
      var avr = datas.reduce((cur,acc) => {return cur+acc})/datas.length;
      var min = datas[0];
      var max = datas[0];
      var maxIndex = 0;
      var minIndex = 0
      //find the min of the column and its index
      for(var i = 0; i < datas.length; i++){
        if(datas[i] < min){
          min = datas[i]
          minIndex = i;
        }
      }
      //find the max of the column and its index
      for(var i = 0; i < datas.length; i++){
        if(datas[i] > max){
          max = datas[i];
          maxIndex = i;
        }
      }
     return {average: avr, min: [min, dates[minIndex]], max: [max, dates[maxIndex]] }
    }

   var values = min_max_av(this.props.datetime, this.props.colData)
   //if the columns only display 1s or 0s
   if((values.min[0] === 0 && values.max[0] === 1) || (values.min[0] === 0 && values.max[0] === 0) || (values.min[0] === 1 && values.max[0] === 1)){
     return(
     <div style={{width: 'auto', paddingRight: 10}} id='col-breakdown'>
            <h3 className="score-text">{'Breakdown of ' + this.props.selected}</h3>
            <h3 style={{marginTop: 10}} className="score-text">{'Percent Open: ' + Math.round(((values.average*100)*100))/100 + '%'}</h3>
          </div>)

   }
   //if the column is 'DateTimeStamp'
   else if(this.props.selected == "DateTimeStamp"){
     var date_min = new Date(values.min[1]);
     var date_max = new Date(values.max[1]);
     return(
       <div style={{width: 'auto', paddingRight: 10}} id='col-breakdown'>
              <h3 className="score-text">{'Current Date Range:'}</h3>
              <h4 style={{marginTop: 10}} className="score-text">{"Start: " + date_min.toUTCString()}</h4>
              <h4 style={{marginTop: 10}} className="score-text">{"End: " + date_max.toUTCString()}</h4>
            </div>)

   }
   //if the columns is anything else
   else{
     var date_min = new Date(values.min[1]);
     var date_max = new Date(values.max[1]);
   return(
   <div id='col-breakdown'>
            <h4 className="score-text">{'Breakdown of ' + this.props.selected}</h4>
            <h5 className="score-text">{'Column Average: ' + values.average}</h5>
            <h5 className="score-text">{"Minimum of "+ this.props.selected + ": " + values.min[0] + ' occured at ' + date_min.toUTCString()}</h5>
            <h5 className="score-text">{"Maximum of "+ this.props.selected + ": " + values.max[0] + ' occured at ' + date_max.toUTCString()}</h5>

          </div>)
  }
}
}

export default Breakdown
