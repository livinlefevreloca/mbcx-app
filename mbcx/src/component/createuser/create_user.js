import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import './create.css'
class Create extends React.Component{
  constructor(props){
    super(props);

    /*constructor:
            allStates:
                  res - message being displayed depending on server response
                  success -  if the user was create succesfully set to true component redirects to login
    */

    this.state = {
      res: '',
      sucess: false
    }
    this.create = this.create.bind(this);
  }

  create(e){
    e.preventDefault()
    let form = document.getElementById('create');
    if(form.elements[3].value !== form.elements[4].value){
      this.setState({res:"The passwords input do not match. Please try again"})
    }
    var request = 'person='+form.elements[0].value+'&email='+form.elements[1].value+'&address=' + (form.elements[2].value.split(' ').join('+'))+'&pw='+form.elements[3].value;
    var post = 'http://localhost:3001/createuser';
    window.fetch(post, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
        }),
      body: request
    }).then(res => res.json())
      .then((data) => {console.log(data.result);
      var result = data.result
      if( result === 'exists'){
        this.setState({res:'A user with this email already exisits in our system. Click "Forgot Password" if you need to recover your account'});
      }
      if(result === 'error'){
        this.setState({res: 'An Error occured while creating your account please try again later'});
      }
      if(result === 'created'){
        this.setState({success: true});

      }
    });

  }

  render(){
    if(this.state.success){
      return(<Redirect to='/login'/>)
    }
    else{
      return(
        <div id='createuser-box'>
          <div id="form-container">
            <h1>Create an Account</h1>
            <form id='create'>
            Full Name:<br/>
            <input size="50" name="Name" type="text"/><br/>
            <br/>
            Email Address:<br/>
            <input size="50" name="Email Address" type="text"/><br/>
            <br/>
            Building Address:<br/>
            <input size="50" name='address' type='text'/><br/>
            <br/>
            Password:<br/>
            <input size="50" name="Password" type='password'/><br/>
            <br/>
            Re-enter Password: <br/>
            <input size="50" name="Password" type='password'/><br/>
            <br/>
            <input onClick={this.create} type="submit"/><br/>
            </form>
            <br/>
            <a href="#">Forgot password?</a>
            <h5 id="message">{this.state.res}</h5>
          </div>


        </div>
  )
}
  }


}

export default Create
