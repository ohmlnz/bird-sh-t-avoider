import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Matter from 'matter-js';
import CharacterWalking from './images/character-walking.gif';
import CharacterIdling from './images/character-idling.gif';

export class Renderer extends Component {
  render() {
    const source = this.props.actions[this.props.action];
    const { width, height } = source;
    const body = this.props.body;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;
    const angle = body.angle;
    const direction = this.props.direction.horizontal;
    
    return (
      <Image
        source={source}
        style={[
          styles.character,
          {
            width: 65,
            height: 80,
            left: x,
            top: y,
            transform: [
              { rotateZ: angle + 'rad' },
              { rotateY: (direction === 'right' ? 0 : 180) + 'deg' }
            ],
            ...(this.props.hit && { opacity: .5 })
          } 
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  character: {
    position: 'absolute'
  }
});

export default (world, pos) => {
  let width = 65;
  let height = 80;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 0.8,
    frictionAir: 0.2,
    friction: 1,
  });  
  Matter.World.add(world, [body]);
  return {
    body,
    size: { width, height },
    controls: {
      gestures: {},
      mode: 'platform'
    },
    direction: {
      horizontal: 'right',
      vertical: 'up'
    },
    health: 3,
    acceleration: 0,
    hit: false,
    setHealth: true,
    action: 'idling',
    actions: {
      idling: resolveAssetSource(CharacterIdling),
      walking: resolveAssetSource(CharacterWalking),
    },
    'power-ups': {},
    animations: {},
    renderer: <Renderer />
  };
};
