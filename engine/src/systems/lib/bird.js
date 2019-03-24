import Matter from 'matter-js';
import Bird  from '../../components/bird/index';


function setPosition(bird,width) {
  // if (bird.body.position.x >= width) {
  //   bird.left = true;
  //   bird.right = false;
  // }
  // if (bird.body.position.x === 0) {
  //   bird.right = true;
  //   bird.left = false;
  // }
  // if (bird.left)
  //   bird.body.position.x -= 7;
  // if (bird.right)
   if(bird.isGoingLeft){
    bird.body.position.x -= 4;
   }else{
    bird.body.position.x += 4;
   }
}


function addBird(screenWidth) {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  world.gravity = { x: 0, y: 0 };
  let isGoingLeft = Math.random() >= 0.5;
  let startingPosition = isGoingLeft ? { x:screenWidth ,y:45 } : { x:0,y:55 } 
  return Bird(world, startingPosition, isGoingLeft);
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

module.exports = {
  setPosition,
  addBird,
  getBirds
};