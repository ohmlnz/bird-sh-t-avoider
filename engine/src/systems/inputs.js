import { Dimensions } from 'react-native';

const fireEvent = (entities, { touches }) => {
  let mario = entities.mario;
  let bird = entities.bird;
  let pressed = touches.filter(t => t.type === 'start')[0]
  let end = touches.filter(t => t.type === 'end')[0]
  const { width, height } = Dimensions.get('window');

  
  if (bird.body.position.x >=width){
    bird.left = true;
    bird.right = false;
  }
  if (bird.body.position.x === 0){
    bird.right = true;
    bird.left = false;
  }
  if(bird.left)bird.body.position.x-= 7;
  if(bird.right)bird.body.position.x+= 7;



  // set action based on event input
  if (pressed && !end) {
    console.log(width)

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



const secondEvent = (entities, { touches }) => {
  let bird = entities.bird;

}

export { fireEvent,secondEvent }
