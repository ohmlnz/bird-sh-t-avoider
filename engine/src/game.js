import React, { PureComponent } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { LevelOne } from './levels/one';
import Systems from './systems'

export default class Game extends PureComponent {
  state = {
    running: true
  }

  gameOver = () => {
    this.setState({ 
      running: false, 
      gameOver: true 
    })
  }

  restart = () => {
    this.refs.engine.swap(LevelOne());

    this.setState({
      running: true,
      gameOver: false,
    })
  }

  handleEvent = ev => {
    if (ev.type === 'game-over') {
      this.gameOver()
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={"engine"}
          systems={Systems}
          entities={LevelOne()}
          running={this.state.running}
          onEvent={this.handleEvent}
        >
          <StatusBar hidden={true} />
          { this.state.gameOver && 
            <TouchableOpacity onPress={this.restart}>
              <Text style={styles.gameOver}>
                You lost! Click here to play again.
              </Text> 
            </TouchableOpacity>
          }
        </GameEngine>
      </View>
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6dc7ff'
  },
  gameOver: {
    marginTop: 80,
    textAlign: 'center',
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
  }
});
