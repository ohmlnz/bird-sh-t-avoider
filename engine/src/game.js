import React, { PureComponent } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { LevelOne } from './levels/one';

export default class Game extends PureComponent {
  render() {
    return (
      <GameEngine
        ref={"engine"}
        style={styles.game}
        systems={[]}
        entities={LevelOne()}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  game: {
    backgroundColor: "#000"
  }
});
