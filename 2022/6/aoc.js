import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  return input.split('').findIndex((x,i) => {
    if(i >= 3){
      let test = [];
      for(let y = 0; y <= 3; y++){
        test.push(input[i-y]);
      }
      let set = [...new Set(test)];
      return test.join('') === set.join('')
    }
    else {
      return false;
    }
  }) + 1
}

console.log(problem(input))

const problem2 = (input) => {
  return input.split('').findIndex((x,i) => {
    if(i >= 13){
      let test = [];
      for(let y = 0; y <= 13; y++){
        test.push(input[i-y]);
      }
      let set = [...new Set(test)];
      return test.join('') === set.join('')
    }
    else {
      return false;
    }
  }) + 1
}

console.log(problem2(input))
