import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return {
      mine: line.split(' | ')[1].split(' ').filter(x => x).map(x => Number(x)),
      winners: line.split(' | ')[0].split(': ')[1].split(' ').filter(x => x).map(x => Number(x)),
    }
  })
  let sum = 0;
  lines.forEach(line => {
    let matches = line.mine.filter(x => line.winners.includes(x));
    if(matches.length){
      sum += Math.pow(2,matches.length - 1)
    }
  })
  return sum
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    return {
      mine: line.split(' | ')[1].split(' ').filter(x => x).map(x => Number(x)),
      winners: line.split(' | ')[0].split(': ')[1].split(' ').filter(x => x).map(x => Number(x)),
      count: 1,
    }
  })
  lines.forEach((line, i) => {
    let matches = line.mine.filter(x => line.winners.includes(x));
    lines.slice(i+1, i+1+matches.length).forEach(l => l.count = l.count + line.count);
  })
  return lines.reduce((a,b) => a + b.count, 0)
}

console.log(problem2(input))
