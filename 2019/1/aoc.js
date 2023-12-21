import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  return input.split('\n').filter(Boolean).map(Number)
  .reduce((a,b) => a + (Math.floor(b/3)-2), 0);
}

console.log(problem(input))

const problem2 = (input) => {
  return input.split('\n').filter(Boolean).map(Number)
  .reduce((a,b) => {
    let newFuel = Math.floor(b/3)-2;
    let fuel = 0;
    while(newFuel > 0){
      fuel += newFuel;
      newFuel = Math.floor(newFuel/3)-2;
    }
    return a + fuel
  }, 0);
}

console.log(problem2(input))
