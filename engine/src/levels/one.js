import { Dimensions } from 'react-native';
import Matter from 'matter-js';
import Mario from '../components/mario';
import Bird from '../components/bird';


//-- Overriding this function because the original references HTMLElement
//-- which will throw an error when running in a React Native context
Matter.Common.isElement = () => false; 

const { width, height } = Dimensions.get('window');
const cx = width / 2;
// const offsetY = (height - 465) / 2 - 35;

export const LevelOne = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  world.gravity = { x: 0, y: 0 };

  return {
    physics: { engine: engine, world: world },
    mario: Mario(world, { x: cx, y: offsetY + 465 - 20 / 2 - 20 }),
    bird: Bird(world, {x:0,y:55}),
    camera: { offsetY: 0 }
  };
};
