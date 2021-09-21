import {React,Component} from 'react';
import { Link } from 'react-router-dom';  
class Sidebar extends Component{
  render(){
    return(
        <>    
         
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
              <a href="#!" class="brand-link">
              <img src="../dist/img/admin-portal.jpg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
              style={{opacity: .8}}/>
              <span class="brand-text font-weight-light">HELLO-VISA</span>
              </a>
              <div class="sidebar">
                  <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img src="../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User" />
                    </div>
                    <div class="info" style={{color:'white'}}>
                        Admin
                    </div>
                  </div>
                  <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li class="nav-item has-treeview ">
                        <Link to="category">
                          <a href="#!" class="nav-link">
                              <i class="nav-icon fas fa-copy"></i>
                              <p>Category</p>
                          </a>
                          </Link>
                        </li>
                        <li class="nav-item has-treeview ">
                        <Link to="category_list">
                          <a href="#!" class="nav-link">
                              <i class="nav-icon fas fa-copy"></i>
                              <p>Category List</p>
                          </a>
                          </Link>
                        </li>
                    </ul>
                  </nav>
              </div>
            </aside>

        </>
      );
    }
  }

export default Sidebar;