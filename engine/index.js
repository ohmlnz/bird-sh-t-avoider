import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Game from './src/game';

export default class Engine extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Game />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
