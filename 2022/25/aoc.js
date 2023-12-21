import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

let getNum = (x) => {
  if(x === '2' || x === '1' || x === '0'){
    return Number(x)
  }
  else if(x === '-'){
    return -1
  }
  else {
    return -2
  }
}

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return line.split('').map(getNum).reverse();
  });
  let total = lines.reduce((a,b) => {
    let sum = 0;
    b.forEach((digit, place) => {
      sum += digit * Math.pow(5, place);
    });
    return sum + a;
  }, 0);

  let output = '';
  let pow = 0;
  while(total > 0){
    let remainder = (total/Math.pow(5, pow))%5;
    console.log(remainder)
    if(remainder === 4){
      total = total + (1*Math.pow(5, pow));
      remainder = '-';
    }
    else if(remainder === 3){
      total = total + (2*Math.pow(5, pow));
      remainder = '=';
    }
    else {
      total = total - (remainder*Math.pow(5, pow));
      remainder = `${remainder}`;
    }
    output = remainder + output;
    pow++;
    console.log(total, output)
  }
  return output
}

console.log(problem(input))

const problem2 = (input) => {

}

console.log(problem2(input))
