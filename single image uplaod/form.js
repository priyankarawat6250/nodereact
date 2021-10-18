const axios = require("axios");
class Form extends React.Component{

state={    
        selectedFile:'',
        
      }



mySubmit = e => {
        e.preventDefault();
       
             
            let newObj = new FormData()
            newObj.append('file',this.state.selectedFile)
            //newObj.append('name',this.state.formdata.name)
            
            
                axios.post(config.googleAuth.backURL+`admin/addservice`,newObj)
                
                .then(res=>{
                  console.log("response",res.data)
                  if(res.data.status == true){
                    console.log("Yaahoooooooo");

                  }else{
                    console.log("Something wrong!");
                  }
                  //return res.json();
                })
                .catch(err=>{
                  console.log("error",err)
                })         
         
  
  }

onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
    //this.setState({ selectedFile: [...this.state.selectedFile, ...e.target.files] })

};

 render(){

    return(
      <div>
 <form onSubmit={this.mySubmit} encType="multipart/form-data" id="cat_form">
            <input type="file" name='file' id='file' defaultValue={this.state.selectedFile} class="form-control" accept="image/*" onChange={this.onFileChange}/>
                  
        
        <button type="submit" className="btn btn-success">Submit</button>
    </form>
    </div>
        
      )
  }
}

export default Form