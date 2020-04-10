import React from 'react';
import {ActivityIndicator, View, Text, Modal} from 'react-native';

const FullPageLoader = props => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#00000040',
        }}>
        <View
          style={{
            width: '50%',
            height: 'auto',
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="blue" />
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontSize: 14,
            }}>
            {props.TextToShow ? props.TextToShow : 'Please Wait'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default FullPageLoader;
