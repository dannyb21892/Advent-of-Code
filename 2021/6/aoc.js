import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let fish = input.split(',').map(f => Number(f));
  for(let day = 1; day <=80; day++){
    const newFish = [];
    fish.forEach((f,i) => {
      if(f === 0){
        fish[i] = 6;
        newFish.push(8);
      }
      else {
        fish[i] = f - 1;
      }
    });
    fish = [...fish, ...newFish]
  }
  return fish.length
}

console.log(problem(input))

const problem2 = (input) => {
  let fish = input.split(',').map(f => Number(f));

  //initialize frequencies with all 0s
  let freqs = {};
  for(let i = 0; i <= 8; i++){
    freqs[i] = 0;
  }
  //populate input frequencies
  fish.forEach(f => {
    if(freqs[f]){
      freqs[f] = freqs[f] + 1;
    }
    else {
      freqs[f] = 1;
    }
  });

  for(let day = 1; day <=256; day++){
    const newFreqs = {...freqs};
    newFreqs[8] = freqs[0];
    newFreqs[7] = freqs[8];
    newFreqs[6] = freqs[0] + freqs[7];
    for(let i = 0; i <= 5; i++){
      newFreqs[i] = freqs[i+1];
    }
    freqs = newFreqs;
  }

  return Object.values(freqs).reduce((a,b) => a+b,0)
}

console.log(problem2(input))
