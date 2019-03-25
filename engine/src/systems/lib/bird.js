import Matter from 'matter-js';
import Bird  from '../../components/bird/index';


function setPosition(bird,width) {
  let {position} = bird.body;
  Matter.Body.setPosition(bird.body, {
    x: bird.isGoingLeft ? position.x -= 4 : position.x += 4,
    y: position.y
  });
}


function addBird(currentWorld, screenWidth = 0) {

  let isGoingLeft = Math.random() >= 0.5;
  let startingPosition = isGoingLeft ? { x:screenWidth ,y:45 } : { x:0,y:55 }; 
  return Bird(currentWorld, startingPosition, isGoingLeft);
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

function deleteBirds(entites,screenWidth){
  let keys = Object.keys(entites);
  for(let i = 0; i < keys.length; i++){
    if(keys[i].includes('__bird__')){
      if(entites[keys[i]].body.position.x > screenWidth || 
        entites[keys[i]].body.position.x < 0){
        delete entites[keys[i]];
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