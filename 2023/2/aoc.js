import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x)
  let sum = 0;
  lines.forEach((x,i) => {
    let gameWorks = true;
    let draws = x.split(': ')[1].split('; ').map(d => d.split(', '));
    draws.forEach(d => {
      let hasRed = d.filter(x => x.includes('red'));
      hasRed.forEach(r => {
        if(Number(r.split(' ')[0]) > 12){
          gameWorks = false;
        }
      });
      let hasBlue = d.filter(x => x.includes('blue'));
      hasBlue.forEach(r => {
        if(Number(r.split(' ')[0]) > 14){
          gameWorks = false;
        }
      })
      let hasGreen = d.filter(x => x.includes('green'));
      hasGreen.forEach(r => {
        if(Number(r.split(' ')[0]) > 13){
          gameWorks = false;
        }
      })
    })
    if(gameWorks) {
      sum += (1+i);
      console.log(1+i)
    }
  })
return sum
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x)
  let sum = 0;
  lines.forEach((x,i) => {
    let draws = x.split(': ')[1].split('; ').map(d => d.split(', '));
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
    draws.forEach(d => {
      let hasRed = d.filter(x => x.includes('red'));
      hasRed.forEach(r => {
        maxRed = Math.max(maxRed, Number(r.split(' ')[0]));
      });
      let hasBlue = d.filter(x => x.includes('blue'));
      hasBlue.forEach(r => {
        maxBlue = Math.max(maxBlue, Number(r.split(' ')[0]));
      })
      let hasGreen = d.filter(x => x.includes('green'));
      hasGreen.forEach(r => {
        maxGreen = Math.max(maxGreen, Number(r.split(' ')[0]));
      });
    });
    sum += (maxRed * maxBlue * maxGreen)
  })
  return sum
}

console.log(problem2(input))
