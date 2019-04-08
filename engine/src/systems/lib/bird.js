import Matter from 'matter-js';
import Bird  from '../../components/bird/index';
import { hasExceededScreenLimits } from '../helpers'

function setPosition(bird,width) {
  let {position} = bird.body;
  Matter.Body.setPosition(bird.body, {
    x: bird.isGoingLeft ? position.x -= 4 : position.x += 4,
    y: position.y
  });
}

function addBird(currentWorld, screenWidth = 0, birdName) {
  let isGoingLeft = Math.random() >= 0.5;
  let startingPosition = isGoingLeft ? { x: screenWidth, y: 45 } : { x: 0, y: 55 }; 
  return Bird(currentWorld, startingPosition, isGoingLeft, birdName);
}

function getBirds(entites){
  let keys = Object.keys(entites);
  let birds = [];
  for(let i = 0; i < keys.length; i++){
    if(keys[i].includes('__bird__')){
      birds.push(entites[keys[i]]);
    }
  }
  return birds;
}

function deleteBirds(currentWorld, entities) {
  let keys = Object.keys(entities);
  for(let i = 0; i < keys.length; i++){
    if(keys[i].includes('__bird__')){
      if (hasExceededScreenLimits(entities[keys[i]]) && !entities[keys[i]].pooping) {
        Matter.Composite.remove(currentWorld, entities[keys[i]].body);
        delete entities[keys[i]];
      }
    } 
  }
}

module.exports = {
  setPosition,
  addBird,
  getBirds,
  deleteBirds
};