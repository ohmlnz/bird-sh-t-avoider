import React, { Component } from 'react';
import { Image } from 'react-native';
import Matter from 'matter-js';

export class Renderer extends Component {
  render() {   
    const body = this.props.body;
    const x = body.position.x;
    const y = body.position.y; 
    return (
      <Image
        style={[
          {
            top: y,
            left: x,
            position: 'absolute',
            backgroundColor: 'brown',
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
  let width = 10;
  let height = 10;
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
    renderer: <Renderer />
  };
};
