import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Matter from 'matter-js';
import MarioWalking from './mario-walking.gif';
import MarioIdling from './mario-idling.gif';



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
            left: x,
            top: y,
            transform: [
              { rotateZ: angle + 'rad' },
              { rotateY: (direction === 'right' ? 180 : 0) + 'deg' }
            ]
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

export default (world, pos, isGoingLeft, birdName) => {
  let width = 30;
  let height = 40;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 0.8,
    frictionAir: 0.2,
    friction: 1,
  });
  Matter.World.add(world, [body]);
  return {
    isGoingLeft,
    body,
    key: birdName,
    turds: [],
    pooping: false,
    size: { width, height },
    controls: {
      gestures: {},
      mode: 'platform'
    },
    direction: {
      horizontal: 'right',
      vertical: 'up'
    },
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