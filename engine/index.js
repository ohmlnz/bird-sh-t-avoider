import React, { PureComponent } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Game from './src/game';

export default class Engine extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Game />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  }
});
