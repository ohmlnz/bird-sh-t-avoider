import { Dimensions } from 'react-native';
import Matter from 'matter-js';
import birdHelpers from './helpers/bird'
import Turd  from '../components/turd/index';
import uuidv1 from 'uuid/v1'
import { collidesWith, randomized, hasExceededScreenLimits } from './helpers/utils';
const { width, height } = Dimensions.get('window');

let levelTime = 5;
let level = 1;
let totalBirds = 5;
let birdInterval = levelTime / totalBirds;
let nextSend = 5;
let poopInterval = 10
let maxPoop = 1
let currentPoop = 0

export default (entities, { dispatch }) => {
  // update time
  entities.time += .03;
  let { physics, character } = entities;

  // defaults hit box to false
  character.hit = false;

  // bird position logic
  let seconds = parseFloat(entities.time.toFixed(3));

  //increase level
  if(seconds > 1 && seconds > levelTime){
    levelTime += 10;
    level++;
    totalBirds = level * 1;
    birdInterval = 30 / totalBirds;
    currentPoop = 0
  }

  if(seconds >= nextSend) {
    let birdName = '__bird__' + uuidv1();
    let newBird = birdHelpers.addBird(physics.world, width, birdName);
    entities.birds++
    if (!newBird.isGoingLeft) newBird.direction.horizontal = 'left'
    let turd = Turd(physics.world, { x: - 50, y : newBird.body.position.y })
    newBird.turds = new Array(3).fill(turd)
    entities[birdName] = newBird;
    nextSend = seconds + birdInterval;
  } 

  birdHelpers.deleteBirds(physics.world, entities);

  let birds = birdHelpers.getBirds(entities);

  Object.keys(entities).filter(e => e.includes('__turd__')).forEach(t => {
    if (collidesWith(entities[t].body, character.body)) {
      if (!entities[t].collided) {
        character.health--
        character.setHealth = true
      }
      entities[t].collided = true
      character.hit = true
    }
  })

  if (birds.length) {
    if ((Math.floor(seconds) % poopInterval === 0)) {
      const randomNum = randomized(birds.length);
      const randomBird = birds[randomNum]
      const turdId = '__turd__' + randomBird.key.slice(8);
      
      if (!entities.hasOwnProperty(turdId) && !randomBird.pooping && currentPoop <= maxPoop) {
        currentPoop++
        entities[turdId] = randomBird.turds[randomBird.turds.length - 1]
        randomBird.pooping = true
      }
    }

    // update birds positions
    for (bird of birds) {
      birdHelpers.setPosition(bird, width); 
      // update turd position
      if (bird.pooping) {
        const key = '__turd__' + bird.key.slice(8)
        const turd = entities[key]
        // resistance of turd vs wind
        turd.resistance = bird.isGoingLeft ? turd.resistance - 1 : turd.resistance + 1
        Matter.Body.setPosition(turd.body, {
          x: bird.body.position.x - turd.resistance,
          y: turd.body.position.y + 3
        })

        // remove turd if out of bonds
        if (turd.body.position.y > height) {
          bird.pooping = false
          bird.turds.pop()
          if (!hasExceededScreenLimits(turd)) {
            entities.score = entities.score + 1
            dispatch({ type: 'score', args: entities.score })  
          }
          Matter.Composite.remove(physics.world, turd.body);
          delete entities[key]          
        }
       }
    }
  }

  return entities;
}; 

