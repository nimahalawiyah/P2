import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
  constructor(){
    super()
  this.state={
    title:"Upload File RESTful API MERN",
    index:'',
    selectedFile: null,
    fuis:[]
}
  }
  componentDidMount(){
    this.getfui();
  }
  getfui= _ =>{
    fetch('http://localhost:4000/file')
    .then(response=>response.json())
    .then(response=>this.setState({fuis:response.data}))
    .catch(err=>console.error(err))
  }

  pilihfoto=e=>{
    console.log(e.target.files[0]);
    this.setState({
      selectedFile:e.target.files[0]     
    })
  }
  insert=(e)=>{
    e.preventDefault();
    let data=new FormData();
    data.append('file', this.state.selectedFile);
    data.append('name', this.refs.nama.value);
    axios.post('http://localhost:4000/file/add',data)
    .then(console.log(data))
    .catch(err=>console.error(err))
  }
  renderImageupload=({id,fui})=><div key={id}>{fui}</div>
  render() {
    const{fuis}=this.state;
    return (
      <div className="container">
       <h2>{this.state.title}</h2>
      <form ref="myform" encType="multipart/form-data">
        <input type="hidden" ref="idmatkul" className="formfield"/>
            <div className="form-group">
              <label>Nama:</label>
              <input type="text" ref="nama" placeholder="Kode Mata Kuliah" className="form-control" id="nama" name="nama"/>
            </div>
            <div className="form-group">
              <label>File:</label>
              <input type="file" ref="file" className="form-control" id="file" name="file" onChange={this.pilihfoto}/>
            </div>
        <button onClick={this.insert} className="btn btn-danger">Submit</button>
        </form>
        <div className="table-responsive">
      <table className="table table-dark table-striped">
      <thead>
      <tr>
        <td>No</td>
        <td>Nama</td>
        <td>Image</td>
        </tr>
        </thead>
        <tbody>
      {fuis.map((fui, id)=>
          <tr key={id}>
          <td>{id+1}</td>
          <td>{fui.nama}</td>
          <td>{fui.fileupload}</td>
          </tr>
          )}
          </tbody>
          </table>
          </div>
        </div>      
    );
  }
}

export default App;
