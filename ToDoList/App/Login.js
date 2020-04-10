import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FullPageLoader from './Commons/FullPageLoader';
import NavigationService from './Commons/NavigationService';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: '',
      isLoading: false,
    };
  }
  static navigationOptions = {
    headerShown: false
  };


  loginHandler = async () => {
    let {username, password} = this.state;
    if (!username || !password) {
      this.setState({
        loginError: 'All fields are required',
      });
    } else {
      try {
        this.setState({isLoading: true, loginError: ''});

        let url = 'https://portal.poimapper.com/json/auth/todo/login';
        let data = {userName: username, password};
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        let responseJson = await response.json();
        this.setState({isLoading: false});
        if (!responseJson.errorCode && responseJson.status === 'OK') {
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify({userName: username}),
          );
          NavigationService.navigate('Main');
        } else {
          this.setState({
            loginError: 'Invalid User Credential',
            password: '',
          });
        }
      } catch (e) {
        alert('Error ' + e.message);
        this.setState({isLoading: false});
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FullPageLoader isVisible={this.state.isLoading} />
        <View style={{width: '100%'}}>
          <Text style={styles.title}>To Do List App</Text>
          {this.state.loginError ? (
            <Text style={styles.errorMsg}>{this.state.loginError}</Text>
          ) : null}
          <TextInput
            style={styles.textInput}
            value={this.state.username}
            onChangeText={username => this.setState({username})}
            placeholder="Username"
          />

          <TextInput
            style={styles.textInput}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.loginHandler();
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
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

export default Login;
