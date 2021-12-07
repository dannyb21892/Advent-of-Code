import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  const pos = input.split(',').map(Number);
  const max = Math.max(...pos);
  const min = Math.min(...pos);
  let minPos;
  let minFuel = Infinity;
  for(let i=min; i<=max; i++){
    const fuel = pos.map(x => Math.abs(x - i)).reduce((a,b) => a+b,0);
    if(fuel < minFuel){
      minFuel = fuel;
      minPos = i;
    }
  }

  return minFuel
}

console.log(problem(input))

const problem2 = (input) => {
  const pos = input.split(',').map(Number);
  const max = Math.max(...pos);
  const min = Math.min(...pos);
  let minPos;
  let minFuel = Infinity;
  const fuelMap = {0: 0};

  for(let i = 1; i<=(max-min); i++){
    fuelMap[i] = i + fuelMap[i-1];
  }

  for(let i = min; i<=max; i++){
    const fuel = pos.map(x => fuelMap[Math.abs(x - i)]).reduce((a,b) => a+b,0);
    if(fuel < minFuel){
      minFuel = fuel;
      minPos = i;
    }
  }

  return minFuel
}

console.log(problem2(input))
