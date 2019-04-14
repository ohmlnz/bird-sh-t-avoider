import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Matter from 'matter-js';
import MarioWalking from './images/mario-walking.gif';
import MarioIdling from './images/mario-idling.gif';

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
          styles.mario,
          {
            width: 50,
            height: 80,
            left: x,
            top: y,
            transform: [
              { rotateZ: angle + 'rad' },
              { rotateY: (direction === 'right' ? 180 : 0) + 'deg' }
            ],
            ...(this.props.hit && { backgroundColor: 'yellow' })
          } 
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  mario: {
    position: 'absolute'
  }
});

export default (world, pos) => {
  let width = 50;
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
    health: 1,
    acceleration: 0,
    hit: false,
    action: 'idling',
    actions: {
      idling: resolveAssetSource(MarioIdling),
      walking: resolveAssetSource(MarioWalking),
    },
    'power-ups': {},
    animations: {},
    renderer: <Renderer />
  };
};
