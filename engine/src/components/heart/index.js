import React, { Component } from 'react';
import { Image } from 'react-native';
import Matter from 'matter-js';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Heart from './images/heart.png'

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
            width: 20,
            height: 20,
            position: 'absolute',
          } 
        ]}
      />
    );
  }
}

export default (world, pos) => {
  let width = 20;
  let height = 20;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height);  
  Matter.World.add(world, [body]);
  return {
    body,
    resistance: 0,
    size: { width, height },
    action: 'static',
    actions: {
      static: resolveAssetSource(Heart),
    },
    renderer: <Renderer />
  };
};
