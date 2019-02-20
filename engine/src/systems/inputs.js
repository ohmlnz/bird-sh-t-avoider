//import Matter from 'matter-js';

const fireEvent = (entities, { touches }) => {
	let mario = entities.mario
	let pressed = touches.filter(t => t.type === 'start')[0]
	let end = touches.filter(t => t.type === 'end')[0]

	// set action based on event input
	if (pressed && !end && pressed.event.target === 9) {
		mario.action = 'walking'
		mario.direction.horizontal = pressed.event.locationX > 200 ? 'right' : 'left'
	} else if (end) {
		mario.action = 'idling'
	}

	// set coordinates based on horizontal direction property
	if (mario.action === 'walking') {
		// TO DO: replace direct data mutation w/ Matter.js physics methods
		mario.body.position.x += mario.direction.horizontal === 'right' ? 2 : -2
	}

	return entities;
}

export { fireEvent }