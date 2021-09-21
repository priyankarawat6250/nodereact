import {React,Component} from 'react';
import Header from "./header.js"; 
import Sidebar from "./sidebar.js"; 
import Footer from "./footer.js"; 

class Dashboard extends Component{
  render(){
    return(
        <>
        <Header />
        <Sidebar />
          <h1>Hello</h1>
        <Footer />
        </>
      );
    }
  }

export default Dashboard;
