import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let grid = input.split('\n').map(line => line.split(''));
  let gridWidth = grid[0].length;
  let gridHeight = grid.length;
  let haveMoved = true;
  let steps = 0;
  while(haveMoved){
    steps++;
    haveMoved = false;
    let goingToMove = [];
    grid.forEach((line, i) => {
      line.forEach((x,j) => {
        if(x === '>' && line[(j+1)%gridWidth] === '.'){
          goingToMove.push([i,j]);
          haveMoved = true;
        }
      })
    });
    goingToMove.forEach(coords => {
      grid[coords[0]][coords[1]] = '.';
      grid[coords[0]][(coords[1] + 1)%gridWidth] = '>';
    });

    goingToMove = [];
    grid.forEach((line, i) => {
      line.forEach((x,j) => {
        if(x === 'v' && grid[(i+1)%gridHeight][j] === '.'){
          goingToMove.push([i,j]);
          haveMoved = true;
        }
      })
    });
    goingToMove.forEach(coords => {
      grid[coords[0]][coords[1]] = '.';
      grid[(coords[0]+1)%gridHeight][coords[1]] = 'v';
    });
  }
  return steps;
}

console.log(problem(input))

const problem2 = (input) => {
  //no part 2 today!
}

console.log(problem2(input))
