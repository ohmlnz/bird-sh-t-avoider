import Matter from 'matter-js';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default (entities, { touches }) => {
  let { mario } = entities;
  let pressed = touches.filter(t => t.type === 'start')[0];
  let end = touches.filter(t => t.type === 'end')[0];

  // sets action based on event input
  if (pressed && !end) {
    mario.action = 'walking';
    mario.direction.horizontal = pressed.event.locationX > (width / 2) ? 'right' : 'left';
  } else if (end) {
    mario.action = 'idling';
    mario.acceleration = 0;
  }

  // sets coordinates based on horizontal direction property
  if (mario.action === 'walking') {
    // acceleration may be based upon power-ups or set statically
    mario.acceleration += 0.05;
    let { position, velocity } = mario.body;
    Matter.Body.setVelocity(mario.body, { x: 3.5 * mario.acceleration, y: velocity.y });

    Matter.Body.setPosition(mario.body, {
      x: mario.direction.horizontal === 'right' ? position.x + velocity.x : position.x - velocity.x, 
      y: position.y
    });
  }

  // set boundaries
  if (mario.body.position.x < 0) {
    mario.body.position.x = 0
  } else if (mario.body.position.x > width) {
    mario.body.position.x = width
  }

  return entities;
};
