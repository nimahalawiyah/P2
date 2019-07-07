import React, { Component } from 'react';
import { StyleSheet,Alert,View,Modal,Picker,RefreshControl,ToastAndroid,TouchableOpacity,ScrollView, ActivityIndicator,FlatList } from 'react-native';
import { Container, Header, Icon, Text,Item,Input,Button} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from 'react-redux'
import { requestFetchAction, updateDataAction,delDataAction,filterDataAction,requestFetchtbAction,requestFetchcsoAction,requestFetchdrvAction,filterstatus,requestFetchulAction } from '../actions'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};
class ListIKB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible4: false,
      isDateTimePickerVisible5: false,
      isDateTimePickerVisible6: false,
      fltr:'All Booking',
      eid:'', ecustomer:'',eusername:'',esdate:'',eedate:'',etime:'',esby:'',etbooking:'',ecar:'',epic:'',ebby:'', edrvv:'',edesc:'',
      modalVisible: false,
      modaldVisible:false,
      refreshing:false,
      il:5,
      loads:false
    };
  } 
  componentDidMount(){
    let {navigation}=this.props;
    let item=navigation.getParam('sp');
    if(item=='0'){
      this.setState({fltr:"Unprocessed"});
    }else if(item=='1'){
      this.setState({fltr:"Proccessed"});
    }else{
   this.setState({fltr:"All Booking"});
    }
    this.props.requestFetchulAction();
    this.props.requestFetchAction(item,this.props.reducer.userl.token);
    this.props.requestFetchtbAction(this.props.reducer.userl.token);
    this.props.requestFetchdrvAction(this.props.reducer.userl.token);
    this.props.requestFetchcsoAction(this.props.reducer.userl.token);
    }

 handleLoadMore=async()=>{
  this.setState({loads:true});
  setTimeout(()=>{this.setState((prev)=>{return{il:prev.il+10,loads:false}})},3000);
}  
renderFooter = () => {
  if (!this.state.loads) return null;
  return (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}
    >
      <ActivityIndicator animating size="large" color="#999" />
    </View>
  )
};
    fEdit=(item)=>{
      this.state.eid=item.ID;
      this.state.ecustomer=item.CUST;
      this.state.eusername=item.USERON;
      this.state.esdate=item.TGLPAKAIS;
      this.state.eedate=item.TGLPAKAIE;
      this.state.etime=item.WAKTU;
      this.state.esby=item.STANDBY;
      this.state.etbooking=item.ITPBOOKING;
      this.state.ecar=item.TPMOBIL;
      this.state.epic=item.PIC;
      this.state.ebby=item.IBOOKINGBY;
      this.state.edrvv= item.IDDRIVR;
      this.state.edesc=item.KETERANGAN;
    } 
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  ListEmptyView = () => {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'gray',fontSize:14}}>No Booking Found...</Text>
      </View>
    );
  }
  _onRefresh=()=>{
    let {navigation}=this.props;
    let item=navigation.getParam('sp');
    if(item=='0'){
      this.setState({fltr:"Unprocessed"});
    }else if(item=='1'){
      this.setState({fltr:"Proccessed"});
    }else{
   this.setState({fltr:"All Booking"});
    }
    this.props.requestFetchAction(item,this.props.reducer.userl.token);
    this.setState({il:'6'});
  }
  alertHapus(item){
    Alert.alert(
      'Delete',
      'Are you sure you want to delete '+item.CUST+'?',
      [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => {this.props.delDataAction(item.ID,this.props.reducer.userl.token)}}
      ],
      { cancelable: false }
      )
  } 
  setModaldVisible(visible) {
    this.setState({modaldVisible: visible});
  } 
  dateToYMD=(date)=> {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
} 
showDateTimePicker = () => {
  this.setState({ isDateTimePickerVisible4: true });
};
hideDateTimePicker = () => {
  this.setState({ isDateTimePickerVisible4: false });
};
showDateTimePicker1 = () => {
  this.setState({ isDateTimePickerVisible5: true });
};
hideDateTimePicker1 = () => {
  this.setState({ isDateTimePickerVisible5: false });
};
showDateTimePicker2 = () => {
  this.setState({ isDateTimePickerVisible6: true });
};
hideDateTimePicker2 = () => {
  this.setState({ isDateTimePickerVisible6: false });
};

handleDateStartPicked = date => {
  this.setState({ esdate: this.dateToYMD(date) });
  this.hideDateTimePicker();
};
handleDateEndPicked = date => {
  this.setState({ eedate: this.dateToYMD(date) });
  this.hideDateTimePicker1();
};
handleDatePicked = date => {
  this.setState({ etime: date.toLocaleTimeString() });
  this.hideDateTimePicker2();
};
updatepress=()=>{
    let dataprop={
      id:this.state.eid,
      cust:this.state.ecustomer, 
      useron:this.state.eusername, 
      tgls: this.state.esdate, 
      tgle: this.state.eedate,   
      waktu:this.state.etime, 
      standby:this.state.esby, 
      tpb:this.state.etbooking, 
      tpm:this.state.ecar,
      pic:this.state.epic,
      ibb:this.state.ebby,
      drvv:this.state.edrvv,
      ket:this.state.edesc,
      uby:this.state.ebby,
      udt:new Date().toISOString().slice(0, 10)
    }
    this.props.updateDataAction(dataprop,this.props.reducer.userl.token)
    this.setModalVisible(!this.state.modalVisible)
  }
  render() {
    let colors= ['#efffeb','#ffffff'];
    let { isDateTimePickerVisible4,isDateTimePickerVisible5,isDateTimePickerVisible6 } = this.state;
    if (this.props.reducer.isLoading) {
            return ( 
              <View style={{flex: 1, justifyContent:"center",alignItems:"center"}}>     
              <ActivityIndicator size="large" color="#5ba90a"/>
              </View>
            );
    }
    return (
      <Container>
          <Header searchBar rounded style={{ backgroundColor: '#48a721' }}
      androidStatusBarColor="#3b9018">
            <Item>
            <Icon name="search" />
            <Input placeholder="Search" onChangeText={(text)=> this.props.filterDataAction(text)} value={this.props.reducer.text}/>
          </Item>
          <View style={{marginLeft:28,marginRight:18,justifyContent:'center'}}>
          <Menu>
      <MenuTrigger><Icon name="more" style={{color:"#fff"}} size={24}/>
      </MenuTrigger>
      <MenuOptions>
      <MenuOption onSelect={() => {this.props.requestFetchAction("2",this.props.reducer.userl.token),this.setState({fltr:"All Booking"})}}>
         <Text style={{fontSize:18,paddingLeft:8}}>All Booking</Text>
        </MenuOption> 
         <MenuOption onSelect={()=>{this.props.requestFetchAction("1",this.props.reducer.userl.token),this.setState({fltr:"Processed"})}}>
        <Text style={{fontSize:18,padding:8}}>Proccessed</Text>
        </MenuOption>
        <MenuOption onSelect={()=>{this.props.requestFetchAction("0",this.props.reducer.userl.token),this.setState({fltr:"Unprocessed"})}}>
         <Text style={{fontSize:18,padding:8}}>Unproccessed</Text>
        </MenuOption> 
      </MenuOptions>
    </Menu></View>
        </Header>
        <View style={{backgroundColor:'#f5f5f5',padding:9,flexDirection:'row'}}>
     <View style={{flex:1,flexDirection:'row', alignItems:'center',paddingLeft:5}}>
     <Text style={{color:'#000',fontSize:14}}>Total : </Text>
     <Text style={{color:'#000',fontSize:14}}>{this.props.reducer.data.length} Data {this.state.fltr}</Text>
     </View>
     </View> 
        <View style={styles.forminput}>
       <FlatList data={this.props.reducer.data.slice(0,this.state.il)}
   keyExtractor={ (item) =>item.ID.toString()}
  onEndReached={()=>this.handleLoadMore()}
  onEndReachedThreshold={5}
     renderItem={({ item, index })=>
     <View style={{ backgroundColor: colors[index % colors.length],alignSelf:'stretch',
     borderBottomColor:'rgb(207, 203, 203)',
     borderBottomWidth:.3,
     paddingLeft:15,
     paddingRight:20,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
     paddingTop:15,
     paddingBottom:15 }}>
       <View style={styles.descriptions} key={index}>
         <TouchableOpacity onPress={()=>{this.setModaldVisible(true),this.fEdit(item)}}>
          <Text numberOfLines={1} style={styles.description}>{item.CUST}</Text>
     <Text style={styles.subdescription}>{item.ITPBOOKINGDes}</Text>
     <Text style={styles.subdes}>Periode : {item.TGLPAKAIS} - {item.TGLPAKAIE}</Text> 
     </TouchableOpacity>
     </View>
     <View style={{position:'absolute',top:19,right:10}}><Text style={{fontSize:12,color:'#888'}}>{item.INPUTDATE}</Text></View>
     <Menu>
      <MenuTrigger><Icon name="more" style={{color:"#63b70a",paddingLeft:15,paddingRight:10}} size={24}/>
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => {this.setModalVisible(true),this.fEdit(item)}}>
        <Text style={{fontSize:18,padding:8}}><Icon name="create" style={{color:'#888'}}/>  Edit</Text>
        </MenuOption>
        <MenuOption onSelect={() => this.alertHapus(item)}>
         <Text style={{fontSize:18,padding:8}}><Icon name="trash" style={{color:'#888'}}/>   Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
     </View>
    }
      refreshControl= {
        <RefreshControl
        refreshing={this.props.reducer.refreshing}
        onRefresh={this._onRefresh}
        colors={["red","green","blue"]}/> 
      }
    extraData={this.props.reducer.data}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={this.ListEmptyView}
    ListFooterComponent={this.renderFooter}
   />   
      </View>

      <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible}
          onBackdropPress={()=>{this.setModalVisible(false);}}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row',paddingTop:9,paddingBottom:9,paddingLeft:15,paddingRight:15,backgroundColor:'#48a721',justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',flex:2,fontSize:16,fontWeight:'bold'}}>EDIT BOOKING</Text><TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}><Icon name="ios-close" style={{color:"#fff",fontSize:45,fontWeight:'bold'}} /></TouchableOpacity></View>
                 <ScrollView>
              <View style={{flex:1,backgroundColor:'#fff',paddingTop:9,paddingLeft:15,paddingRight:15,paddingBottom:15}}>
        <Text style={{fontWeight:'bold'}}>CUSTOMER</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({ecustomer:TextInputValue})} style={styles.textinput} value={this.state.ecustomer} editable={false}/>
        <Text style={{fontSize:16,fontWeight:'bold'}}>NAME OF USER</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({eusername:TextInputValue})} style={styles.textinput} value={(this.state.eusername)}/>
       <Text style={{fontWeight:'bold'}} onPress={this.showDateTimePicker}>START DATE</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({esdate:TextInputValue})} style={styles.textinput} value={(this.state.esdate).toString()}/>
        <DateTimePicker
          isVisible={isDateTimePickerVisible4}
          onConfirm={this.handleDateStartPicked}
          onCancel={this.hideDateTimePicker}
        />
       <Text style={{fontWeight:'bold'}} onPress={this.showDateTimePicker1}>END DATE</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({eedate:TextInputValue})} style={styles.textinput} value={(this.state.eedate).toString()} />
        <DateTimePicker
          isVisible={isDateTimePickerVisible5}
          onConfirm={this.handleDateEndPicked}
          onCancel={this.hideDateTimePicker1}
        />
       <Text style={{fontWeight:'bold'}} onPress={this.showDateTimePicker2}>TIME</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({etime:TextInputValue})} style={styles.textinput} value={this.state.etime}/>
        <DateTimePicker
        mode="time"
          timePickerModeAndroid = "spinner"
          isVisible={isDateTimePickerVisible6}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker2}
        />
        <Text style={{fontWeight:'bold'}}>STAND BY</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({esby:TextInputValue})} style={styles.textinput} value={this.state.esby} />
        <Text style={{fontWeight:'bold'}}>TYPE BOOKING</Text>
        <Picker
  selectedValue={this.state.etbooking}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue, itemIndex) => this.setState({etbooking: itemValue})}>
   {this.props.reducer.tb.map((item)=> (<Picker.Item label={item.NamaBooking} key={item.IdBooking} value={item.IdBooking} />))}
</Picker>
<Text style={{fontWeight:'bold'}}>CAR TYPE</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({ecar:TextInputValue})} style={styles.textinput} value={(this.state.ecar)} />
        <Text style={{fontWeight:'bold'}}>PIC</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({epic:TextInputValue})} style={styles.textinput} value={(this.state.epic)}/>
        <Text style={{fontWeight:'bold'}}>BOOKING BY</Text>
        <Picker
  selectedValue={this.state.ebby}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue) => this.setState({ebby: itemValue})}>
   {this.props.reducer.cso.map((item)=> (<Picker.Item label={item.STCSONAMA} key={item.STCSOCOD} value={item.STCSOCOD} />))}
</Picker>
<Text style={{fontWeight:'bold'}}>DRIVER</Text>
        <Picker
  selectedValue={this.state.edrvv}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue,itemIndex) => this.setState({edrvv: itemValue})}>
   {this.props.reducer.drvv.map((item,key)=> 
   <Picker.Item label={item.STNMDRIVR} value={item.IDDRIVR} key={key}  />
   )}
</Picker>
        <Text style={{fontWeight:'bold'}}>DESCRIPTION</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({edesc:TextInputValue})} style={styles.textinput} value={this.state.edesc}  multiline={true} numberOfLines={4} />
        <Button danger rounded block style={{ margin: 15, marginTop: 50 }} onPress={this.updatepress}><Text>Update</Text></Button>
              </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      <Modal
          animationType="fade"
          transparent
          visible={this.state.modaldVisible}
          onBackdropPress={()=>{this.setModaldVisible(false);}}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row',paddingTop:9,paddingBottom:9,paddingLeft:15,paddingRight:15,backgroundColor:'#48a721',justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',flex:2,fontSize:16,fontWeight:'bold'}}>DETAIL BOOKING</Text><TouchableOpacity onPress={() => {
                  this.setModaldVisible(!this.state.modaldVisible);
                }}><Icon name="ios-close" style={{color:"#fff",fontSize:45,fontWeight:'bold'}} /></TouchableOpacity></View>
                 <ScrollView>
              <View style={{flex:1,backgroundColor:'#fff',paddingTop:9,paddingLeft:15,paddingRight:15,paddingBottom:15}}>
        <Text style={{fontWeight:'bold'}}>CUSTOMER</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({ecustomer:TextInputValue})} style={styles.textinput} value={this.state.ecustomer} editable={false}/>
        <Text style={{fontSize:16,fontWeight:'bold'}}>NAME OF USER</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({eusername:TextInputValue})} style={styles.textinput} value={this.state.eusername} editable={false}/>
        <Text style={{fontWeight:'bold'}}>START DATE</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({esdate:TextInputValue})} style={styles.textinput} value={this.state.esdate} editable={false}/>
        <Text style={{fontWeight:'bold'}}>END DATE</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({eedate:TextInputValue})} style={styles.textinput} value={this.state.eedate} editable={false}/>
        <Text style={{fontWeight:'bold'}}>TIME</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({etime:TextInputValue})} style={styles.textinput} value={this.state.etime} editable={false}/>
        <Text style={{fontWeight:'bold'}}>STAND BY</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({esby:TextInputValue})} style={styles.textinput} value={this.state.esby} editable={false}/>
        <Text style={{fontWeight:'bold'}}>TYPE BOOKING</Text>
        <Picker
  selectedValue={this.state.etbooking}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue, itemIndex) => this.setState({etbooking: itemValue})} enabled={false}>
   {this.props.reducer.tb.map((item)=> (<Picker.Item label={item.NamaBooking} key={item.IdBooking} value={item.IdBooking} />))}
</Picker>
<Text style={{fontWeight:'bold'}}>CAR TYPE</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({ecar:TextInputValue})} style={styles.textinput} value={this.state.ecar} editable={false}/>
        <Text style={{fontWeight:'bold'}}>PIC</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({epic:TextInputValue})} style={styles.textinput} value={this.state.epic} editable={false}/>
        <Text style={{fontWeight:'bold'}}>BOOKING BY</Text>
        <Picker
  selectedValue={this.state.ebby}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue) => this.setState({ebby: itemValue})} enabled={false}>
   {this.props.reducer.cso.map((item)=> (<Picker.Item label={item.STCSONAMA} key={item.STCSOCOD} value={item.STCSOCOD} />))}
</Picker>
<Text style={{fontWeight:'bold'}}>DRIVER</Text>
<Picker
  selectedValue={this.state.edrvv}
  style={styles.combobox}
  mode={'dropdown'}
  onValueChange={(itemValue,itemIndex) => {this.setState({edrvv: itemValue})}} enabled={false}>
   {this.props.reducer.drvv.map((item,key)=> (<Picker.Item label={item.STNMDRIVR} key={key} value={item.IDDRIVR}  />))}
</Picker>
        <Text style={{fontWeight:'bold'}}>DESCRIPTION</Text>
        <Input onChangeText={(TextInputValue)=>this.setState({edesc:TextInputValue})} style={styles.textinput} value={this.state.edesc}  multiline={true} numberOfLines={4} editable={false}/>
              </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Toast visible={this.props.reducer.visible} message="Successfully Updated" />
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
    reducer: state.reducer
  }
}
function mapDispatchToProps (dispatch) {
  return {
    requestFetchAction: (status,token) => dispatch(requestFetchAction(status,token)),
    updateDataAction:(dataprop,token)=>dispatch(updateDataAction(dataprop,token)),
    delDataAction:(id,token)=>dispatch(delDataAction(id,token)),
    filterDataAction:(text)=>dispatch(filterDataAction(text)),
    requestFetchtbAction:(token)=>dispatch(requestFetchtbAction(token)),
    requestFetchcsoAction:(token)=>dispatch(requestFetchcsoAction(token)),
    requestFetchdrvAction: (token) => dispatch(requestFetchdrvAction(token)),
    filterstatus: (status) => dispatch(filterstatus(status)),
    requestFetchulAction: () => dispatch(requestFetchulAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListIKB)
const styles = StyleSheet.create({
  forminput:{
    flex:1
  },
  textinput:{
   alignSelf:'stretch',
     height:45,
    paddingBottom:3,
    marginBottom:15,
    borderBottomColor:'#48a721',
     borderBottomWidth:1,
    borderStyle:'solid',
    fontSize:16
  },
  list:{ 
    alignSelf:'stretch',
    borderBottomColor:'rgb(207, 203, 203)',
    borderBottomWidth:.3,
    paddingLeft:5,
    paddingRight:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    paddingTop:15,
    paddingBottom:15
  },
  descriptions:{
    flex:2
  },
  numb:{
    fontSize:22,
    marginRight:25
  },
  description:{
    fontSize:22,
    marginRight:80
  },
  subdescription:{
    fontSize:14,
    color:'#888'
  },
  subdes:{
    fontSize:14,
    color:'#888'
  },
  combobox:{
    borderBottomWidth:1,
    borderBottomColor:'green'
  }
})
