app js

import React, { Component } from 'react';
import { Container} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { MenuProvider } from 'react-native-popup-menu';
import CNTR from './tabnav';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import datareducer from './reducers'
import mySaga from './sagas/mySaga'
import NavigationService from './NavigationService';

const sagaMiddleware=createSagaMiddleware()
const store=createStore(datareducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga) 

export default class App extends Component {
  render() {
     return (
      <Container>
        <Provider store={store}>
        <MenuProvider>
      <CNTR ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
      </MenuProvider>
      </Provider> 
      </Container>
    );
  }
}
