import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const birdHelpers = require('./lib/bird');
const uuidv1 = require('uuid/v1');

let divider = 15;
let level = 1;
let totalBirds = 5;
let birdInterval = divider/totalBirds;
let nextSend

export default (entities, { touches }) => {
  // update time
  entities.time += .03;
	let bird = entities.bird;

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


  return entities;
};
