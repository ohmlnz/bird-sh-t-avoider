import Matter from 'matter-js';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const birdHelpers = require('./lib/bird');
const uuidv1 = require('uuid/v1');

// detects if body is outside of boundaries
const hasExceededScreenLimits = (entity) => {
  return entity.body.position.x >= width || entity.body.position.x <= 0;
};

let time = 10;
let level = 1;
let totalBirds = 5;
let birdInterval = time/totalBirds;
let nextSend = 10;

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
  let seconds = Math.trunc(entities.time);
  let sendCheck = parseFloat(entities.time.toFixed(3));

  //increase level
  if(seconds > 1 && seconds % time === 0){
    time += 10;
    level++;
    totalBirds = level * 5;
    birdInterval = 30/totalBirds;
  }
  // console.log(time)
  // console.log(level)
  // console.log(totalBirds)
  // console.log(birdInterval)
  //  console.log(sendCheck);
  //  console.log(nextSend)
  // console.log(level)



  if(sendCheck === nextSend){
    let birdName = '__bird__' + uuidv1();
    // TODO: change to createBird
    let newBird = birdHelpers.addBird();
    entities[birdName] = newBird;
    nextSend = sendCheck + birdInterval;
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
 

