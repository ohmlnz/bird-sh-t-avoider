import Matter from 'matter-js';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default (entities, { touches }) => {
  let { character } = entities;
  let pressed = touches.filter(t => t.type === 'start')[0];
  let end = touches.filter(t => t.type === 'end')[0];

  // sets action based on event input
  if (pressed && !end) {
    character.action = 'walking';
    character.direction.horizontal = pressed.event.locationX > (width / 2) ? 'right' : 'left';
  } else if (end) {
    character.action = 'idling';
    character.acceleration = 0;
  }

  // sets coordinates based on horizontal direction property
  if (character.action === 'walking') {
    // acceleration may be based upon power-ups or set statically
    character.acceleration += 0.03;
    let { position, velocity } = character.body;
    Matter.Body.setVelocity(character.body, { x: 3.5 * character.acceleration, y: velocity.y });

    Matter.Body.setPosition(character.body, {
      x: character.direction.horizontal === 'right' ? position.x + velocity.x : position.x - velocity.x, 
      y: position.y
    });
  }

  // set boundaries
  if (character.body.position.x < 0) {
    character.body.position.x = 0
  } else if (character.body.position.x > width) {
    character.body.position.x = width
  }

  return entities;
};