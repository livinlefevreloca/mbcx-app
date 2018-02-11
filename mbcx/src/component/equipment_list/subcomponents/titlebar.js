import React from 'react';



class TitleBar extends React.Component{

  /*props:
          -title: a string representing the name of the building

  */

  render(){

    return(<div id="title-bar">
      <img id="logo"  src="../../../../images/logo.png" alt="Aero Logo"/>
        <div className="text-container">
        <h1>{this.props.title}</h1>

        </div>

        </div>);
  }
}


export default TitleBar;
