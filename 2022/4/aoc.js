import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let pairs = lines.map(x => x.split(',')).map(x => {
    return {
      min1: Number(x[0].split('-')[0]),
      min2: Number(x[1].split('-')[0]),
      max1: Number(x[0].split('-')[1]),
      max2: Number(x[1].split('-')[1]),
    }
  })
  return pairs.filter(x =>
    (x.min1 >= x.min2 && x.max1 <= x.max2) ||
    (x.min2 >= x.min1 && x.max2 <= x.max1 )
  ).length
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let pairs = lines.map(x => x.split(',')).map(x => {
    return {
      min1: Number(x[0].split('-')[0]),
      min2: Number(x[1].split('-')[0]),
      max1: Number(x[0].split('-')[1]),
      max2: Number(x[1].split('-')[1]),
    }
  })
  return pairs.filter(x =>
    (x.min1 >= x.min2 && x.min1 <= x.max2) ||
    (x.min2 >= x.min1 && x.min2 <= x.max1 )
  ).length
}

console.log(problem2(input))
