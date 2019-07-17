/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{Component} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Map from './Map.jsx';

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
class AssetInput extends Component {
  constructor(props){
    super(props)
    this.state={
      jalan:"",
      luas:"",
      anggaran:"",
      lat:"",
      lng:""
    }
  }
    onChange=(e)=>{
    const vl=e.target.value;
    const id=e.target.id;
    this.setState({[id]:vl});
  }
  onPressSave=()=>{
  if(!(this.state.jalan && this.state.luas && this.state.anggaran && this.state.lat && this.state.lng)){
    alert("Field ada yang masih harus diisi");
  } 
    fetch('/laporan/insertasset',{
      method:'POST', 
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
      jalan:this.state.jalan,
      luas:this.state.luas,
      anggaran:this.state.anggaran,
      lat:this.state.lat,
      lng:this.state.lng 
      })
    })
    .then(response=>response.json())
    .then(response=>this.setState({data:response.data}))
    .catch(err=>console.error(err))
  }
  getlatlng=(val)=>{
    this.setState({lat:val.lat,lng:val.lng});
  }
  render() {
//function ReportInput(props) {
  const { classes } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Form Aset</h4>
              <p className={classes.cardCategoryWhite}>Tambahkan Aset baru</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Nama Jalan"
                    id="jalan"
                    inputProps={{
                      value:this.state.jalan,
                      onChange:this.onChange
                  }}  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Luas Wilayah"
                    id="luas"
                    inputProps={{
                      value:this.state.luas,
                      onChange:this.onChange
                  }}  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Anggaran"
                    id="anggaran"
                    inputProps={{
                      value:this.state.anggaran,
                      onChange:this.onChange
                  }}  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Latitude"
                    id="lat"
                    inputProps={{
                      value:this.state.lat,
                      onChange:this.onChange,
                      disabled: true
                  }}  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Longitude"
                    id="lng"
                    inputProps={{
                      value:this.state.lng,
                      onChange:this.onChange,
                      disabled: true
                  }}  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Foto"
                    id="foto"
                    type="file"
                    inputProps={{
                      value:this.state.foto,
                      onChange:this.onChange
                  }}  
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.onPressSave}>Simpan</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card >
              <Map zoom={16} center={{ lat: -6.184263, lng: 106.738465 }} latlng={this.getlatlng}/>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
}

AssetInput.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(AssetInput);



import React, { Component } from "react";
import {Map, TileLayer, Popup, Marker, withLeaflet} from "react-leaflet";


const MyMarker = props => {

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  } 

  return <Marker ref={initMarker} {...props}/>
}

class MapExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null
    };
    //this.handleClick = this.handleClick.bind(this);
  }


  handleClick=(e)=>{
   this.setState({ currentPos: e.latlng },()=>{
    this.props.latlng(e.latlng);
   });
  }

  render() {
    return (
      <div>
        <Map center={this.props.center} zoom={this.props.zoom} onClick={this.handleClick}>
          <TileLayer
              url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          { this.state.currentPos && <MyMarker position={this.state.currentPos}>
           {/*  <Popup position={this.state.currentPos}>
              Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup> */}
          </MyMarker>}
        </Map>
      </div>
    )
  }
}

export default MapExample;



/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Component} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class ReportList extends Component {
  constructor(props){
    super(props)
    this.state={
      jalan:"",
      luas:"",
      anggaran:"",
      lat:"",
      lng:"",
      dataa:[],
      datap:[]
    }
  }
  componentDidMount(){
    this.getDataPelaporan();
    this.getDataAset();
  }
  getDataPelaporan=()=>{
    fetch('/pelaporan',{
      method:'GET', 
      headers:{
        'Content-Type':'application/json'
      },
    })
    .then(response=>console.log(response.json()))
    .then(response=>this.setState({datap:response.data}))
    .catch(err=>console.error(err))
}
getDataAset=()=>{
  fetch('/aset',{
    method:'GET', 
    headers:{
      'Content-Type':'application/json'
    },
  })
  .then(response=>response.json())
  .then(response=>this.setState({dataa:response.data}))
  .catch(err=>console.error(err))
}
//function ReportList(props) {
render(){
  const { classes } = this.props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List Asset</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nama Jalan", "Luas Wilayah", "Anggaran", "Tahun","Latitude","Longitude"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List Pelaporan</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nama Jalan", "RT / RW", "Luas Wilayah","Latitude","Longitude"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
}

ReportList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ReportList);


const express=require('express');
const cors =require('cors');
const mysql=require('mysql');
const bodyParser = require('body-parser');
const app = express();
/* const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+ Date.now()+ file.originalname);
    }
});
const upload=multer({storage:storage}); */
const con= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:''
});
con.connect(err=>{
    if(err){
        return err;
    }
});
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false})); 
/* app.use('/upload',express.static('uploads')); */
/* app.get('/laporan',(req, res)=>{
    let limit = 50;   // number of records per page
    let offset = 0;
    const selectall="select count(*) as total from laporan";
    con.query(selectall,(err, rs)=>{
        if(err){
            return res.send(err)
        }else{

            const selectpage="select * from laporan";
            con.query(selectpage,(err, result)=>{
                if(err){
                    return res.send(err)
                }else{
                    return res.json({
                        data:result,
                        success:true
                    })
                }
            });

        }
    });
    });
app.post('/laporan/add',(req, res)=>{
    console.log(req.file); 
    console.log(req.body); 
   const input=JSON.parse(JSON.stringify(req.body));
   const data={
    namajln:input.namajln,
    //luas:input.luas,
    anggaran:input.anggaran,
    tahun:input.tahun,
    longitude:input.longitude,
    latitude:input,latitude
};          
            const insert="insert into laporan set ?";
            con.query(insert,data,(err, results)=> {
                if(err){
                    return res.send(err)
                }else{
                    return res.send('Laporan added')
                }
            });   
}); */
app.get('/pelaporan',(req, res)=>{
            const pelaporan="select * from pelaporan";
            con.query(pelaporan,(err, result)=>{
                if(err){
                    return res.send(err)
                }else{
                    return res.json({
                        data:result,
                        success:true
                    })
                }
            });
    });
    app.get('/aset',(req, res)=>{
        const aset="select * from asset";
        con.query(aset,(err, result)=>{
            if(err){
                return res.send(err)
            }else{
                return res.json({
                    data:result,
                    success:true
                })
            }
        });
});
app.post('/laporan/insertpelaporan',(req, res)=>{
    console.log(req.file); 
    console.log(req.body); 
   const input=JSON.parse(JSON.stringify(req.body));
   const data={
    pjalan:input.jalan,
    rt:input.rt,
    rw:input.rw,
    luas:input.luas,
    latitude:input.lat,
    longitude:input.lng
};          
            const insert="insert into pelaporan set ?";
            con.query(insert,data,(err, results)=> {
                if(err){
                    return res.send(err)
                }else{
                    return res.send('Pelaporan Berhasil disimpan')
                }
            });   
});

app.post('/laporan/insertasset',(req, res)=>{
    console.log(req.file); 
    console.log(req.body); 
   const input=JSON.parse(JSON.stringify(req.body));
   const data={
    ajalan:input.jalan,
    luas:input.luas,
    anggaran:input.anggaran,
    tahun:new Date(),
    latitude:input.lat,
    longitude:input.lng
};          
            const insert="insert into asset set ?";
            con.query(insert,data,(err, results)=> {
                if(err){
                    return res.send(err)
                }else{
                    return res.send('Asset Berhasil disimpan')
                }
            });   
});
 
app.listen(5000,()=>{
    console.log('File server listening on port 5000')
});
