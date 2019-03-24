import Matter from 'matter-js';

// detects if body is outside of boundaries
export const hasExceededScreenLimits = (entity) => {
	return entity.body.position.x >= width || entity.body.position.x <= 0
}
// detects collisions between two bodies
export const collidesWith = (bodyA, bodyB) => {
	return Matter.SAT.collides(bodyA, bodyB).collided
}