import {React,Component} from 'react';
//import './App.css';

class Login extends Component{
    state = {              
        email:'',
        password:'',        
    }

    changeData = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }
   
    loginUser = (e) =>{
        e.preventDefault();
     
        const formData = this.state;
        console.log(formData);
        this.props.history.push('/admin/dashboard')
    }


  render(){
    return(
        <>
          <form id='login-form'  onSubmit={this.loginUser}>
            <label>Email: </label>
            <input type='email' name='email' onChange={this.changeData} required/><br/><br/>

            <label>Password: </label>
            <input type='password' name='password' onChange={this.changeData} required/><br/><br/>
             
            <input type="submit" id="submit" name="login" value="Login"/>
          </form>
        </>
      );
    }
  }

export default Login;
