import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import { collidesWith } from './helpers';
const { width } = Dimensions.get('window');

export default (entities, { touches }) => {
  let { mario } = entities;
  let pressed = touches.filter(t => t.type === 'start')[0];
  let end = touches.filter(t => t.type === 'end')[0];

  // defaults hit box to false
  mario.hit = false;

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

  // TODO: set collision with turds
  // if (collidesWith(mario.body, bird.body)) {
  // 	mario.hit = true
  // }

  return entities;
};
