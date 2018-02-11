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
      var address = localStorage.address;
      const root = window.location.protocol + '//' + window.location.hostname + ':3001/';
      const building = address.split(' ').join('+');
      const query = root + 'buildquery?address=' + building;
      window.fetch(query)
        .then(res => res.json())
          .then((data) =>{
            var groups = {}
            for(let i= 0; i < data.length; i++){
            if (Object.keys(groups).indexOf(data[i].equip_type) == -1){
              groups[data[i].equip_type] = [data[i].equipment_id,];
            }
            else{
              groups[data[i].equip_type].push(data[i].equipment_id);
            }
            }
            this.setState({equipment: groups, clicked: Object.keys(groups)[0], building: window.localStorage.address, isloaded: true});
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
