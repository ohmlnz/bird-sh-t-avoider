import Matter from 'matter-js';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

// detects if body is outside of boundaries
export const hasExceededScreenLimits = (entity) => {
	return entity.body.position.x > width || entity.body.position.x < 0
}

// detects collisions between two bodies
export const collidesWith = (bodyA, bodyB) => {
	return Matter.SAT.collides(bodyA, bodyB).collided
}

// generates a random number between min and max
export const randomized = (max, min = 0) => {
	return Math.floor(Math.random(min) * Math.floor(max))
} 