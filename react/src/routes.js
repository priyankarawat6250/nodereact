import {React,Component} from "react";
import {Switch,Route} from 'react-router-dom';
import App from "./Register.js";
import Login from "./Login.js"; 
import Dashboard from "./admin/Dashboard.js"; 
import Category from "./admin/Category.js"; 
import Category_list from "./admin/Category_list.js"; 

class Routes extends Component{
    render(){
      
      return(
        <>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/register" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/admin/dashboard" component={Dashboard}/>
            <Route path="/admin/category" component={Category}/>
            <Route path="/admin/category_list" component={Category_list}/>
        </Switch>
        </>
      )
    }
}

export default Routes;
