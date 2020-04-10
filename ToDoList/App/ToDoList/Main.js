import React, {Component} from 'react';
import {Alert, View, Text, Button, FlatList, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../Commons/NavigationService';
import {NavigationEvents} from 'react-navigation';

const {width, height} = Dimensions.get('window');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      toDoListEmpty: [],
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'To Do List App',
      headerRight: () => {
        return (
          <Button
            color="#841584"
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure want to logout?',
                [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      await AsyncStorage.removeItem('userData');
                      navigation.navigate('Login');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            title="Logout"
          />
        );
      },
    };
  };
  componentDidMount() {
    this.getAlreadyTask();
  }
  getAlreadyTask = async () => {
    console.log('Run');
    let alltasks = await AsyncStorage.getItem('Tasks');
    console.log(alltasks);
    if (alltasks) {
      this.setState({
        toDoList: JSON.parse(alltasks),
      });
    } else {
      this.setState({
        toDoList: [],
      });
    }
  };

  showList = values => {
    console.log(values);
    return (
      <View
        style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          {values.item.title}
        </Text>
        <Text style={{fontSize: 14}}>{values.item.description}</Text>
        <Text style={{fontSize: 14}}>{values.item.priority}</Text>
        <Text style={{fontSize: 14}}>{values.item.due}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, margin: 10}}>
        <NavigationEvents
          onDidFocus={payload => {
            this.getAlreadyTask();
          }}
        />
        {this.state.toDoList.length > 0 ? (
          <>
            <View style={{marginBottom: 20}}>
              <Button
                color="#841584"
                onPress={() => {
                  NavigationService.navigate('Manage', {
                    type: 'Add',
                  });
                }}
                title="Add a task"
              />
            </View>
            <FlatList
              style={{
                flex: 1,
                width: width,
              }}
              data={this.state.toDoList}
              extraData={this.state}
              renderItem={this.showList}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
            />
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <Text style={{fontSize: 20, marginBottom: 20}}>
              Your to-do list is empty
            </Text>
            <Button
              color="#841584"
              onPress={() => {
                NavigationService.navigate('Manage', {
                  type: 'Add',
                });
              }}
              title="Add a task"
            />
          </View>
        )}
      </View>
    );
  }
}

export default Main;
