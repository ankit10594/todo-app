import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../Commons/NavigationService';

const fields = [
  {text: 'title', type: 'string', required: true},
  {text: 'description', type: 'string', required: true},
  {text: 'due', type: 'date', required: false},
  {text: 'priority', type: 'numeric', required: false, min: 0, max: 5},
];
class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      title: '',
      description: '',
      due: '',
      priority: '',
      allTasks: [],
    };
  }

  componentDidMount() {
    let type = this.props.navigation.state
      ? this.props.navigation.state.params.type
      : null;
    this.getType(type);
  }

  static navigationOptions = ({navigation}) => {
    let type = navigation.state ? navigation.state.params.type : 'Manage';
    return {
      headerTitle: type + ' Task',
    };
  };

  getAlreadyTask = async () => {
    let alltasks = await AsyncStorage.getItem('Tasks');
    if (alltasks) {
      this.setState({
        allTasks: JSON.parse(alltasks),
      });
    } else {
      this.setState({
        allTasks: [],
      });
    }
  };

  getType = type => {
    this.setState({
      type,
    });
    this.getAlreadyTask();
  };

  showForm = () => {
    if (fields) {
      let renderItems = fields.map((items, index) => {
        return (
          <View key={index}>
            <Text style={{textTransform: 'capitalize'}}>{items.text}</Text>
            <TextInput
              onChangeText={value =>
                this.setState({
                  [items.text]: value,
                })
              }
              value={this.state[items.text]}
              keyboardType={items.type == 'numeric' ? 'numeric' : 'default'}
              style={styles.textInput}
            />
          </View>
        );
      });
      return renderItems;
    }
  };

  handleManage = async () => {
    let {type} = this.state;

    if (type === 'Add') {
      let oldTasks = this.state.allTasks ? this.state.allTasks : [];
      console.log(oldTasks);
      let newTaskTOAdd = {
        title: this.state.title,
        description: this.state.description,
        due: this.state.due,
        priority: this.state.priority,
      };
      let newOrd = [...oldTasks, newTaskTOAdd];
      console.log(newOrd);
      this.setState(
        {
          allTasks: newOrd,
        },
        async () => {
          console.log('this.state.allTasks', this.state.allTasks);
          await AsyncStorage.setItem(
            'Tasks',
            JSON.stringify(this.state.allTasks),
          );
          NavigationService.navigate('Main');
        },
      );
    } else {
    }
  };

  render() {
    return (
      <View style={{flex: 1, padding: 20}}>
        {this.showForm()}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.handleManage();
          }}>
          <Text style={styles.buttonText}>{this.state.type} task</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    marginVertical: 5,
    padding: 10,
    borderColor: '#999',
    fontSize: 18,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#841584',
    width: '100%',
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  textError: {
    color: 'red',
  },
  errorMsg: {
    backgroundColor: 'red',
    marginBottom: 20,
    padding: 10,
    color: '#fff',
    borderRadius: 5,
  },
});

export default Manage;
