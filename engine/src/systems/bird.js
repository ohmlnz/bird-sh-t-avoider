import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const birdHelpers = require('./lib/bird');
const uuidv1 = require('uuid/v1');

let levelTime = 10;
let level = 1;
let totalBirds = 5;
let birdInterval = levelTime/totalBirds;
let nextSend = 10;

export default (entities, { touches }) => {
  // update time
  entities.time += .03;
  let { bird, physics } = entities;

  // bird position logic
  let seconds = parseFloat(entities.time.toFixed(3));

  //increase level
  if(seconds > 1 && seconds > levelTime){
    levelTime += 10;
    level++;
    totalBirds = level * 5;
    birdInterval = 30/totalBirds;
  }

  if(seconds >= nextSend) {
    let birdName = '__bird__' + uuidv1();
    let newBird = birdHelpers.addBird(physics.world,width);
    entities[birdName] = newBird;
    nextSend = seconds + birdInterval;
  }

  birdHelpers.deleteBirds(entities,width);

  let birds = birdHelpers.getBirds(entities);
  if(birds.length) for(bird of birds) birdHelpers.setPosition(bird, width);  

  return entities;
}; 

