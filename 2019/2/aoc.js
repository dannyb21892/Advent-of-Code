import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

export const createIntCodeInput = (input) => input.split(',').map(Number);

export const intCode = (program) => {
  let pointer = 0;
  while(program[pointer] !== 99){
    if(program[pointer] === 1){
      program[program[pointer+3]] = program[program[pointer+1]] + program[program[pointer+2]];
    }
    else if(program[pointer] === 2){
      program[program[pointer+3]] = program[program[pointer+1]] * program[program[pointer+2]];    }
    pointer += 4;
  }
  return program;
}

const problem = (input) => {
  input = input.split(',');
  input[1] = '12';
  input[2] = '2';
  return intCode(createIntCodeInput(input.join(',')))[0]
}

console.log(problem(input))

const problem2 = (input) => {
  input = createIntCodeInput(input);
  let output = null;
  for(let a = 0; a <= 99; a++){
    for(let b = 0; b <= 99; b++){
      let copy = [
        input[0],
        a,
        b,
        ...input.slice(3)
      ];
      if(intCode(copy)[0] === 19690720){
        return 100*a+b
      }
    }
  }
}

console.log(problem2(input))
