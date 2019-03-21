import Matter from 'matter-js';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const birdHelpers = require('./lib/bird');
const uuidv1 = require('uuid/v1');

// detects if body is outside of boundaries
const hasExceededScreenLimits = (entity) => {
  return entity.body.position.x >= width || entity.body.position.x <= 0;
};

let divider = 15;
let level = 1;
let totalBirds = 5;
let birdInterval = divider/totalBirds;
let nextSend

const fireEvent = (entities, { touches }) => {
  // update time
  entities.time += .03;
  let mario = entities.mario;
  let pressed = touches.filter(t => t.type === 'start')[0];
  let end = touches.filter(t => t.type === 'end')[0];
  let bird = entities.bird;

  // sets action based on event input
  if (pressed && !end) {
    mario.action = 'walking';
    mario.direction.horizontal = pressed.event.locationX > (width / 2) ? 'right' : 'left';
  } else if (end) {
    mario.action = 'idling';
  }
  
  // bird position logic
  let seconds = Math.trunc(entities.time)

  //increase level
  if(seconds > 1 && seconds % divider === 0){
    divider += 30;
    console.log(Math.log(level));
    level++;
    let birdName = '__bird__' + uuidv1();
    let newBird = birdHelpers.addBird();
    entities[birdName]= newBird;
  }

  if(level > 1){

  }
  
  let birds = birdHelpers.getBirds(entities);
  if(birds.length) for(bird of birds) birdHelpers.setPosition(bird, width);

  // sets coordinates based on horizontal direction property
  if (mario.action === 'walking') {
    // TO DO: replace direct data mutation w/ Matter.js physics methods
    mario.body.position.x += mario.direction.horizontal === 'right' ? 4 : - 4;
  }

  return entities;
};

export { fireEvent };
 

