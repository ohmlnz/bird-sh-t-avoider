import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import { collidesWith } from './helpers'
const { width } = Dimensions.get('window');

export default (entities, { touches }) => {
  let { mario, bird } = entities
  let pressed = touches.filter(t => t.type === 'start')[0]
  let end = touches.filter(t => t.type === 'end')[0]

  // default hit box to false
  mario.hit = false

  // sets action based on event input
  if (pressed && !end) {
    mario.action = 'walking'
    mario.direction.horizontal = pressed.event.locationX > (width / 2) ? 'right' : 'left'
  } else if (end) {
    mario.action = 'idling'
  }

	// sets coordinates based on horizontal direction property
	if (mario.action === 'walking') {
		let pos = mario.body.position
		// TODO: define velocity and acceleration
		Matter.Body.setPosition(mario.body, { 
			x: mario.direction.horizontal === "right" ? pos.x + 2.5 : pos.x - 2.5, 
			y: pos.y
		})
	}

	// TODO: set collision with turds
	if (collidesWith(mario.body, bird.body)) {
		mario.hit = true
	}

  return entities
}
