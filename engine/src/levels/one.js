import { Dimensions } from 'react-native';
import Matter from 'matter-js';
import Character from '../components/character';

//-- Overriding this function because the original references HTMLElement
//-- which will throw an error when running in a React Native context
Matter.Common.isElement = () => false; 

const { width, height } = Dimensions.get('window');
const cx = width / 2;
//const offsetY = (height - 465) / 2 - 35;

export const LevelOne = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  let time = 0

  world.gravity = { x: 0, y: 0 };

  return {
    physics: { engine: engine, world: world },
    character: Character(world, { x: cx, y: height - 90 }),
    camera: { offsetY: 0 },
    time,
    entry: 0,
    exit: 0,
    birds: 0,
    score: 0
  };
};
