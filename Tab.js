tab js

import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator,createAppContainer,createStackNavigator,createSwitchNavigator } from 'react-navigation';
import Splacesrc from './screens/splash'
import Login from './screens/login'
import Landing from './screens/landing'
import IKBInput from './screens/ikbf'
import Profile from './screens/profile'
import ListIKB from './screens/listikb'
const Bottomtab= createBottomTabNavigator ({
Landing:{screen:Landing,
navigationOptions:{
tabBarIcon:({tintColor})=>(<Icon name="ios-home" color={tintColor} size={29}/>),
tabBarOptions:{
showLabel:false,
activeTintColor:'#b10808',
inactiveTintColor:'#fff',
style:{
backgroundColor:'#48a721'
}
}
} 
},
IKBF:{screen:IKBInput,
navigationOptions:{
tabBarIcon:({tintColor})=>(<Icon name="ios-add-circle-outline" color={tintColor} size={29}/>),
tabBarOptions:{
showLabel:false,
activeTintColor:'#b10808',//ec390c
inactiveTintColor:'#fff',
style:{
backgroundColor:'#48a721'
}
}
} 
},/* ,
 ListIKB:{
   screen:ListIKB,
    navigationOptions:{
    tabBarIcon:({tintColor})=>(<Icon name="ios-paper" color={tintColor} size={29} />),
   // tabBarOnPress:{()=>navigation.navigate('ListIKB',{sp:"2"})},
    tabBarOptions:{
    showLabel:false,
    activeTintColor:'#b10808',
    inactiveTintColor:'#fff',
    style:{
    backgroundColor:'#48a721'
    }
    }
    }
  }  */
  Profile:{
    screen:Profile,
     navigationOptions:{
     tabBarIcon:({tintColor})=>(<Icon name="ios-person" color={tintColor} size={29} />),
    // tabBarOnPress:{()=>navigation.navigate('ListIKB',{sp:"2"})},
     tabBarOptions:{
     showLabel:false,
     activeTintColor:'#b10808',
     inactiveTintColor:'#fff',
     style:{
     backgroundColor:'#48a721'
     }
     }
     }
   }
}
,{
initialRouteName:'Landing',
order:['Landing','IKBF','Profile'],
header: null,
headerMode: 'none',
navigationOptions:{
tabBarVisible:true
}
});
const LogAppStack = createStackNavigator({
    Loin:Login
  }, {
    initialRouteName: 'Loin',
    header: null,
    headerMode: 'none'
  });
  const SplashAppStack = createStackNavigator({
    splshscr:Splacesrc
  }, {
    initialRouteName: 'splshscr',
    header: null,
    headerMode: 'none'
  });
const AppStack = createStackNavigator({
    Main: Bottomtab,
    ListIKB:ListIKB 
  }, {
    initialRouteName: 'Main',
    header: null,
    headerMode: 'none'
  });
  const switchNav=createSwitchNavigator({
    spls:SplashAppStack,
    SLogin: LogAppStack,
    Home:AppStack
  }, {
    initialRouteName: 'spls',
  });
const CNTR = createAppContainer(switchNav);
export default CNTR;
