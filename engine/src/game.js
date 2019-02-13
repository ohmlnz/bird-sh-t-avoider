import React, { PureComponent } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { LevelOne } from './levels/one';
import { fireEvent } from './systems/inputs';

export default class Game extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={"engine"}
          systems={[fireEvent]}
          entities={LevelOne()}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
