import React from 'react';
import TitleBar from './subcomponents/titlebar';
import HeaderBar from './subcomponents/headerbar';
import Jumbotron from './subcomponents/jumbotron';
import './equip.css'

class EquipmentContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      equipment: [],
      clicked: '',
      building: '',
      isloaded: false

    };

    this.clickTab = this.clickTab.bind(this);
     }

    componentWillMount(){
      //get address associated with username
      var address = localStorage.address;
      //get root url
      const root = 'https://mbcx-server.herokuapp.com/';
      //set up address for url-encoding
      const building = address.split(' ').join('+');
      //building get query
      const query = root + 'buildquery?address=' + building;
      //get request to server for data start with last 240 entries/ 24 hours in DB
      window.fetch(query)
        .then(res => res.json())
          .then((data) =>{
            var groups = {}
            //organize retrieved data into lists labeled by theyre type
            for(let i= 0; i < data.length; i++){
              if (Object.keys(groups).indexOf(data[i].equip_type) == -1){
                groups[data[i].equip_type] = [data[i].equipment_id,];
            }
            else{
              groups[data[i].equip_type].push(data[i].equipment_id);
            }
            }
            this.setState({equipment: groups, clicked: Object.keys(groups)[0], building: localStorage.address, isloaded: true});
            });




  }

  clickTab(e){
    //retrieves the clicked tabs id and sets the clicked state to that value
    var click = e.target.id;
    this.setState({clicked: click});
  }

  render(){
    if(!this.state.isloaded){
      return(<h1>Loading...</h1>)
    }
    return(
      <div id="page-container">
        <TitleBar title={this.state.building} />
        <HeaderBar clickTab={this.clickTab} equipment={this.state.equipment} clicked={this.state.clicked} />
      <Jumbotron equipment={this.state.equipment} clicked={this.state.clicked} />
        </div>);
  }

}

export default EquipmentContainer;
