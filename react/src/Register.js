import {React,Component} from 'react';
//import './App.css';

class App extends Component{
  state = {
                fname:'',
                lname:'',
                phone:'',
                email:'',
                confirmemail:'',
                password:'',
                gender:'',
                errorEmail:'',
                errorPhone:''
    }

  changeData = (e) =>{
    if(e.target.name==='phone'){
      if(e.target.value.length<10){
        this.setState({errorPhone:'Enter Valid Mobile number'});
      }else{
        this.setState({errorPhone:''});
      }
    }

    this.setState({[e.target.name]:e.target.value});

       
    }
   
  registerUser = (e) =>{
  
    e.preventDefault();
    if(this.state.errorEmail!==''||this.state.errorPhone!==''){
      return false;
    }


    
      if(this.state.email!==this.state.confirmemail){
        this.setState({errorEmail:'Email not matched'});
          return false;
      }else{
        this.setState({errorEmail:''});
      }


    const formData = this.state;
    console.log(formData);
    this.props.history.push('/login')
     
  }


  render(){
    return(
        <>
        <form id='register-form' onSubmit={this.registerUser}>
            <label>First Name: </label>
            <input type='text' name='fname' onChange={this.changeData} required /><br/><br/>

            <label>Last Name: </label>
            <input type='text' name='lname' onChange={this.changeData} required/><br/><br/>

            <label>Phone: </label>
            <input type='text' name='phone' onChange={this.changeData} required/>{this.state.errorPhone}<br/><br/>

            <label>Email: </label>
            <input type='email' name='email' onChange={this.changeData} required/><br/><br/>

            <label>Confirm Email: </label>
            <input type='email' name='confirmemail' onChange={this.changeData} required/>{this.state.errorEmail}<br/><br/>

            <label>Password: </label>
            <input type='password' name='password' onChange={this.changeData} required/><br/><br/>

            <label>Female: </label>
            <input type='radio' name='gender' value="Female" onChange={this.changeData} checked/>
            <label>Male: </label>
            <input type='radio' name='gender' value="Male" onChange={this.changeData}/> 


            <p style={{color:'red'}}>{this.state.error}</p> 
            <input type="submit" id="submit" name="submit"/>
            <input type="reset" name="clear" onClick={this.emptyData}/><br/>
          </form>
        </>
      );
    }
  }

export default App;
