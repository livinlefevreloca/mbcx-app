import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import './login.css';


class LoginPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {res: '', sucess: false}
    this.login = this.login.bind(this);
  }
  //login form handler
  login(e){
    e.preventDefault();
    var form = document.getElementById("login");
    var post = "https://mbcx-server.herokuapp.com/auth";
    //url-encoded body for post request
    var request = 'email='+form.elements[0].value + '&pw=' + form.elements[1].value;
    //make post request for login
    window.fetch(post,{
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
      body: request
    })
    .then(res => res.json())
    .then((data) =>{
      if(data.failure){
        //if email/password does not exist
        this.setState({res: "The Email or Password enetered is incorrect. Please try again"})
      }
      else{
        if(data.nodata){
          //if account exists but no data is in tables
          this.setState({res:"The Email and Password you entered are correct however there is no data for this building yet. Please try back at a later date"})
        }
        else if(data.prob){
          //if there was an internal server air
          this.setState({res: "There was an internal server error please try again later"})
        }
        else{
        //set address represents the 'session'
        localStorage.address = data.address;
        this.setState({success: true})
      }
      }
    })
  }

  render(){
    if(this.state.success){
      //if the login is successful redirect to equipment page associated with building address
      var building = localStorage.address.split(' ').join('+')
      var redirect = "/building/" + building;
      return(<Redirect to={redirect} />)
    }
    return(
    <div className="login-box">
        <div id="form-container">
          <h1>MBCX Reports</h1>
        <form id="login">
          Email Address:<br/>
          <input size="50" name="Email Address" type="text"/><br/>
          Password:<br/>
          <input size="50" name="Password" type='password'/><br/>
           <br/>
          <input onClick = {this.login} type="submit"/><br/>
          <br/>
          <a href="#">Forgot password?</a><br/>
          <Link to='/create'>New User</Link>
        </form>
          <h5 id="message">{this.state.res}</h5>
          </div>
        </div>
    );
  }
}

export default LoginPage;
