import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input, expansion) => {
  let lines = input.split('\n').filter(x=>x).map((line) => line.split(''));
  let emptyRows = lines.map((line, y) => line.includes('#') ? null : y).filter(Boolean);
  let emptyCols = lines[0].map((spot,x) => lines.map(line => line[x]).includes('#') ? null : x).filter(Boolean);

  let gals = [];
  lines.forEach((line,y) => {
    line.forEach((spot,x) => {
      if(spot === '#') gals.push({spot,x,y});
    })
  });
  let sum = 0;

  gals.forEach((g1,i) => {
    gals.slice(i+1).forEach(g2 => {
      let vertAddition = 0;
      for(let row of emptyRows){
        if(row < Math.max(g1.y, g2.y) && row > Math.min(g1.y, g2.y)){
          vertAddition += expansion - 1;
        }
      }
      let horiAddition = 0;
      for(let col of emptyCols){
        if(col < Math.max(g1.x, g2.x) && col > Math.min(g1.x, g2.x)){
          horiAddition += expansion - 1;
        }
      }
      sum += Math.abs(g1.y - g2.y) + Math.abs(g1.x - g2.x) + vertAddition + horiAddition;
    })
  })
  return sum
}

console.log(problem(input, 2))

console.log(problem(input, 1000000))
