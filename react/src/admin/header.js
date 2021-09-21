import {React,Component} from 'react';

class Header extends Component{
  render(){
    return(
        <>
        
        <div class="wrapper">
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <ul class="navbar-nav">
                  <li class="nav-item d-none d-sm-inline-block">
                      <a href="admin/dashboard/logout" class="nav-link">Logout</a>
                  </li>
                </ul>
            </nav>
          </div>
  
        </>
      );
    }
  }

export default Header;