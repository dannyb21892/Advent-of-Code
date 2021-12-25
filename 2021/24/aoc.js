import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

//this function just checks that the provided number is correct
//the number was derived manually here:
//https://docs.google.com/spreadsheets/d/1zw71lbLTfY1mo9XLXpnhja85PZ6PhsCD_k-v5Dh0Wew/edit?usp=sharing
const problem = (input) => {
  let lines = input.split('\n').map(line => {
    let parts = line.split(' ');
    return {
      op: parts[0],
      a: parts[1],
      b: parts[2]
    }
  });

  let model = '93959993429899';
  let vars = {
    w: 0, x: 0, y: 0, z: 0
  };
  let inpCount = 0;
  if(model % 100000 === 99999) console.log(model)
  lines.forEach((line) => {
    if(line.op === 'inp'){
      //console.log(vars)
      vars[line.a] = Number(model[inpCount]);
      inpCount++;
    }
    else {
      let arg2 = isNaN(Number(line.b)) ? vars[line.b] : Number(line.b);
      if(line.op === 'add'){
        vars[line.a] = vars[line.a] + arg2;
      }
      else if(line.op === 'mul'){
        vars[line.a] = vars[line.a] * arg2;
      }
      else if(line.op === 'div'){
        vars[line.a] = Math.trunc(vars[line.a] / arg2);
      }
      else if(line.op === 'mod'){
        vars[line.a] = vars[line.a] % arg2;
      }
      else if(line.op === 'eql'){
        vars[line.a] = Number(vars[line.a] === arg2);
      }
    }
  });

  return vars

}



console.log(problem(input))

const problem2 = (input) => {

}

console.log(problem2(input))
