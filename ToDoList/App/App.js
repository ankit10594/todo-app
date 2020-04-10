import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import NavigationService from './Commons/NavigationService';

import Login from './Login';
import Main from './ToDoList/Main';
import Manage from './ToDoList/Manage';
import SplashScreen from './SplashScreen';

const AppStack = createStackNavigator({
  Main: Main,
  Manage: {
    screen: Manage,
    navigationOptions: {
      headerMode: 'none',
      mode: 'modal',
    },
  },
});
const AuthStack = createStackNavigator({Login: Login});

const TopLevelNavigator = createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
