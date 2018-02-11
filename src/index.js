import React from 'react';
import ReactDOM from 'react-dom'
import TableContainter from './component/data_display/table_container.js';
import LoginPage from './component/loginpage/login_page.js';
import EquipmentContainer from './component/equipment_list/equipment_container.js';
import Create from './component/createuser/create_user.js';
import './style.css'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

const App = () =>{
    return (<Switch>
      <Route exact path='/login' component={LoginPage}/>
      <Route  exact path='/building/:address' component={EquipmentContainer}/>
      <Route  exact path='/equipment/:equip' component={TableContainter}/>
      <Route exact path='/create' component={Create}/>
    </Switch>);


};


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('reactor'));
