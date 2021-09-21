import {React,Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from "./header.js"; 
import Sidebar from "./sidebar.js"; 
import Footer from "./footer.js"; 

export default class Category extends Component{

    state={
        cat_id:'',
        cat_name:'',
        cat_img:'',
        selectedFile:'',
        message:'',
    }
    
    addCatRequest = (e) =>{
        e.preventDefault();
        //const formData = this.state;

        const formData = new FormData();
        try {
              formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
        }
        catch(err) {
          console.log("Image not found");
        }
        

        formData.append(
          "cat_name",this.state.cat_name,
        );
       
        //console.log(this.state);
        axios.post(`http://localhost:3001/addCatRequest`, formData)
           .then((res) => {
              console.log('hii-->'+res.data.msg);
              if (res.data.msg === "success") {
                this.setState({ message: "Category Inserted Successfully" });
              }

              setTimeout(
                () => this.setState({ message: ''}),
                3000
              );
              document.getElementById("cat_form").reset();

           })
           .then((data) => {
                
        })
        .catch(err=>{
        });   
    }


    updateCatRequest = (e) =>{
        e.preventDefault();
        
        const formData = new FormData();
        try {
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        }
        catch(err) {
          console.log("Image not found");
        }
        formData.append(
          "cat_name",this.state.cat_name,
        );
          formData.append(
            "cat_img",this.state.cat_img,
          );
          formData.append(
            "id",this.state.cat_id,
          );
      
        axios.post(`http://localhost:3001/updateCatRequest`, formData)
           .then((res) => {
               
              if (res.data.msg === "success") {
                this.setState({ message: "Category Updated Successfully" });
              }

           })
           .then((data) => {
                
        })
        .catch(err=>{
        });   
    }


    onFileChange = event => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    changeData = (e) =>{       
        this.setState({[e.target.name]:e.target.value});
    }


    componentDidMount(){      

      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get('id'); 

        axios.post('http://localhost:3001/get_category_by_id',{id:id})
            .then(res => 
              {
              this.setState({cat_name:res.data.catdata.cat_name});
              this.setState({cat_img:res.data.catdata.cat_img});
              this.setState({cat_id:res.data.catdata._id});
            }
            )
            .catch(error => console.log("Error:"+error))
        
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
            <h1>Add Category</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">Home</li>
              <li class="breadcrumb-item"><Link to="category_list">Add Category</Link></li>
              <li class="breadcrumb-item active">Add Category</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Add Category</h3>
              </div>
               
              <form onSubmit={this.state.cat_id !==''? this.updateCatRequest:this.addCatRequest} enctype="multipart/form-data" id='cat_form'>
              <font color="green"><center>{this.state.message}</center></font>
                <div class="card-body">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Category Icon</label>
                    <input type="file" name='file' id='file' defaultValue='' class="form-control" accept="image/*" onChange={this.onFileChange}/>
                  </div>

                  {this.state.cat_id!=='' ? 
                  
                  <div class="form-group">                      
                    <img src={`http://localhost:3001/${this.state.cat_img}`} onError={(e)=>{e.target.onError = null; e.target.src = fallbackSrc}} height="80px" width="80px"/>
                  </div>
                  
                  :''}
                  
                  
                  <div class="form-group">
                    <label for="exampleInputEmail1">Category</label>
                    <input type="text" name='cat_name' defaultValue={this.state.cat_name} class="form-control" required placeholder="Enter category name" onChange={this.changeData} />
                
                  </div>
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
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

