import React, { Component } from 'react';
import { Image } from 'react-native';
import Matter from 'matter-js';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import TurdStatic from './images/turd-static.png'

export class Renderer extends Component {
  render() {   
    const source = this.props.actions[this.props.action];
    const body = this.props.body;
    const x = body.position.x;
    const y = body.position.y; 
    return (
      <Image
        source={source}
        style={[
          {
            top: y,
            left: x,
            width: 50,
            height: 50,
            position: 'absolute',
          } 
        ]}
      />
    );
  }
}

export default (world, pos) => {
  let width = 50;
  let height = 50;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 0.8,
    frictionAir: 0.2,
    friction: 1,
  });  
  Matter.World.add(world, [body]);
  return {
    body,
    resistance: 0,
    size: { width, height },
    acceleration: 0,
    action: 'falling',
    actions: {
      falling: resolveAssetSource(TurdStatic),
    },
    renderer: <Renderer />
  };
};
