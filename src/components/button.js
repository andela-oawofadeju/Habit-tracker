import React, { Component } from 'react';
import react from 'react-native';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

module.exports = React.createClass({
  render: () => {
    return(
    <TouchableHighlight style={[styles.button, styles.button]} underlayColor={'gray'}>
      <View>
        <Text style = {[styles.buttonText]}>this.props.text</Text>
        </View>
        </TouchableHighlight>
    )
  }
});
const styles= StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 10,
    borderColor: '#A8CD1B',
    margin: 20,
  },
  buttonText: {
    color: '#005A31',
    flex: 1,
    alignSelf: 'center',
    fontSize: 16,
  }
})