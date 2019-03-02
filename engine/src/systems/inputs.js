import Matter from 'matter-js';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

// detects if body is outside of boundaries
const hasExceededScreenLimits = (entity) => {
	return entity.body.position.x >= width || entity.body.position.x <= 0
}

const fireEvent = (entities, { touches }) => {
	let mario = entities.mario
	let pressed = touches.filter(t => t.type === 'start')[0]
	let end = touches.filter(t => t.type === 'end')[0]

	// sets action based on event input
	if (pressed && !end) {
		mario.action = 'walking'
		mario.direction.horizontal = pressed.event.locationX > (width / 2) ? 'right' : 'left'
	} else if (end) {
		mario.action = 'idling'
	}

	// sets coordinates based on horizontal direction property
	if (mario.action === 'walking') {
		// TO DO: replace direct data mutation w/ Matter.js physics methods
		mario.body.position.x += mario.direction.horizontal === 'right' ? 4 : - 4
	}

	return entities;
}

export { fireEvent }