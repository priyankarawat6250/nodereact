import {React,Component} from 'react';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
//require("bootstrap/less/bootstrap.less");

import axios from 'axios';
import Header from "./header.js"; 
import Sidebar from "./sidebar.js"; 
import Footer from "./footer.js"; 

export default class Category extends Component{

    state={
      activePage: 1,
      totalItem:0,
      message:'',
      category:[],
    }

    handlePageChange=(pageNumber)=>{
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
      axios.get('http://localhost:3001/get_category',{page:pageNumber})
      .then(res => 
        {
        this.setState({category:res.data.catdata})
        
        console.log(this.state.category); 
      }
        )
      .catch(error => console.log("Error:"+error))   
    }
          
    

    componentDidMount(){
        console.log("componentDidMount");
        

        axios.post('http://localhost:3001/getCollectionCount',{tbl:'category'})
            .then(res => 
              {
              this.setState({totalItem:res.data.count})
              
              console.log(this.state.totalItem); 
            }
              )
            .catch(error => console.log("Error:"+error))


        axios.get('http://localhost:3001/get_category')
            .then(res => 
              {
              this.setState({category:res.data.catdata})
              
              console.log(this.state.catdata); 
            }
              )
            .catch(error => console.log("Error:"+error))
        
    }

    deleteCategory=(e)=>{
      console.log(e.target.id);
          
      if(window.confirm('Are you sure?')){


        


      axios.post('http://localhost:3001/delete_category',{id:e.target.id})
            .then(res => 
              {
                //let apps = this.state.category;
                const apps = this.state.category.filter(item => item._id !== e.target.id);
                console.log(apps);

                this.setState({category:apps,message: 'Category deleted successfully' });
                 
                setTimeout(
                  () => this.setState({ message: ''}),
                  3000
                );
              }
              )
            .catch(error => console.log("Error:"+error))



            axios.post('http://localhost:3001/getCollectionCount',{tbl:'category'})
          .then(res => 
            {
            this.setState({totalItem:res.data.count})
            
            console.log(this.state.totalItem); 
          }
            )
          .catch(error => console.log("Error:"+error))
              }
    }
     
    render(){
      const fallbackSrc = "http://localhost:3001/no-img.png";
         
    return(
        <>
        <Header />
        <Sidebar />

  <div class="content-wrapper">    
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Category List</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">Home</li>
              <li class="breadcrumb-item"><Link to="category">Add Category</Link></li>
              <li class="breadcrumb-item active">Category List</li>
            </ol>
          </div>
        </div>
      </div> 
    </section>

     
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
                <h3 class="card-title">Category List</h3>
            </div>             
            <div class="card-body">
              <font style={{color:'green'}}><center>{this.state.message}</center></font>
              <table id="example2" class="table table-bordered table-hover tbl-responsive">
                    <thead>
                          <tr>
                            <th width='10%'>Sr No.</th>
                            <th width='30%'>Category</th>
                            <th width='40%'>Category Icon</th>
                            <th width='20%'>Action</th>
                          </tr>
                    </thead>
                    <tbody>

                      {this.state.category.map((cat,index)=>{                       
                          const imageSrc = 'http://localhost:3001/'+cat.cat_img; 
                          
                          return (                        
                            <tr>
                                  <td>{++index}</td>
                                  <td>{cat.cat_name}</td>
                                  <td>
                                  <img src={imageSrc} onError={(e)=>{e.target.onError = null; e.target.src = fallbackSrc}} height="80px" width="80px" />

                                  </td>
                                  <td>
                                  <Link to={`category?id=${cat._id}`}><button type="button" class="btn btn-success btn-sm">Edit</button></Link>

                                    <button type="button" class="btn btn-danger btn-sm" id={cat._id} onClick={this.deleteCategory}>Delete</button>
                                  </td>
                              </tr>               
                          
                            );   
                      })}

                    </tbody>
                    
              </table>



              <div>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={1}
                  totalItemsCount={this.state.totalItem}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

        
        <Footer />
        </>
      );
    }
}

