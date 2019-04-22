import React, { PureComponent } from 'react'
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { GameEngine } from 'react-native-game-engine'
import { LevelOne } from './levels/one'
import Systems from './systems'
import BusStop from './busstop.jpg'

export default class Game extends PureComponent {
  state = {
    running: true,
  }

  gameover = () => {
    this.setState({ 
      running: false, 
      gameover: true 
    })
  }

  restart = () => {
    this.refs.engine.swap(LevelOne());

    this.setState({
      running: true,
      gameover: false,
    })
  }

  handleEvent = ev => {
    if (ev.type === 'game-over') {
      this.gameover()
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BusStop} style={styles.background}>
          <GameEngine
            ref={"engine"}
            systems={Systems}
            entities={LevelOne()}
            running={this.state.running}
            onEvent={this.handleEvent}
          >
            <StatusBar hidden={true} />
            { this.state.gameover && 
              <TouchableOpacity onPress={this.restart}>
                <Text style={styles.gameover}>
                  You lost! Click here to play again.
                </Text> 
              </TouchableOpacity> }
          </GameEngine>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%', 
    height: '100%', 
    zIndex: -1
  },
  gameover: {
    marginTop: 80,
    textAlign: 'center',
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
  }
});
