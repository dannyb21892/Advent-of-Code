import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem1old = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    let dir = line.split(' ')[0];
    let len = Number(line.split(' ')[1]);
    let color = line.split(' ')[2].slice(2,-1)
    return {dir, len, color}
  });
  let current = [0,0];
  let allMoves = [current];
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  lines.forEach(line => {
    let newCurrent = [...current];
    if(line.dir === 'L'){
      newCurrent[0] -= line.len;
    }
    else if(line.dir === 'R'){
      newCurrent[0] += line.len;
    }
    else if(line.dir === 'U'){
      newCurrent[1] += line.len;
    }
    else if(line.dir === 'D'){
      newCurrent[1] -= line.len;
    }
    minX = Math.min(minX, newCurrent[0]);
    maxX = Math.max(maxX, newCurrent[0]);
    minY = Math.min(minY, newCurrent[1]);
    maxY = Math.max(maxY, newCurrent[1]);
    allMoves.push(newCurrent);
    current = newCurrent;
  });
  let grid = [];
  let gridHeight = maxY - minY + 1;
  let rowLength = maxX - minX + 1;
  for(let y = 0; y < gridHeight; y++){
    let row = new Array(rowLength).fill();
    grid.push(row.map((spot,x) => {
      return {
        x, y
      }
    }));
  }

  current = grid[maxY][-minX];
  current.dug = true;
  grid.forEach((row,y) =>{
    row.forEach((spot,x) => {
      spot.U = grid[y-1] ? grid[y-1][x] : null;
      spot.D = grid[y+1] ? grid[y+1][x] : null;
      spot.R = grid[y][x+1] || null;
      spot.L = grid[y][x-1] || null;
    })
  });
  lines.forEach(line => {
    for(let x = 0; x < line.len; x++){
      current = current[line.dir];
      current.dug = true;
    }
  });
  console.log(grid.map(line => line.map(x => x.dug ? '#' : '.').join('')).join('\n'))
  let fillCurrents = [grid[maxY][-minX].D.R];
  while(fillCurrents.length){
    let newFillCurrents = new Set();
    fillCurrents.forEach(x => {
      x.dug = true;
      for(let dir of ['L','R','D','U']){
        let newSpot = x[dir];
        if(newSpot && !newSpot.dug){
          newFillCurrents.add(newSpot)
        }
      }
    });
    fillCurrents = [...newFillCurrents];
  };
  let total = 0;
  grid.forEach(row => row.forEach(spot => total += spot.dug ? 1 : 0));
  return total
}

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x).map(line => {
    let dir = line.split(' ')[0];
    let len = Number(line.split(' ')[1]);
    let color = line.split(' ')[2].slice(2,-1)
    return {dir, len, color}
  });
  let current = [0,0];
  let allCoords = [current];
  let lastOrientationClockwise = 'false';
  lines.forEach((line, i) => {
    //console.log(line)
    let newCurrent = [...current];
    let nextDir = (lines[i+1] || lines[0]).dir;
    let counterclockwise = (line.dir === 'L' && nextDir === 'D') || 
      (line.dir === 'D' && nextDir === 'R') || 
      (line.dir === 'R' && nextDir === 'U') || 
      (line.dir === 'U' && nextDir === 'L');
    let offset = 0;
    if(lastOrientationClockwise && !counterclockwise) offset = 1;
    if(!lastOrientationClockwise && counterclockwise) offset = -1;

    if(line.dir === 'L'){
      newCurrent[0] -= (line.len + offset);
    }
    else if(line.dir === 'R'){
      newCurrent[0] += (line.len + offset);
    }
    else if(line.dir === 'U'){
      newCurrent[1] += (line.len + offset);
    }
    else if(line.dir === 'D'){
      newCurrent[1] -= (line.len + offset);
    }
    //console.log(newCurrent)
    allCoords.push(newCurrent);
    current = newCurrent;
    lastOrientationClockwise = !counterclockwise;
  });
  //console.log(allCoords)
  allCoords.push([0,0]);
  let sum = 0;
  allCoords.forEach((coord, i) => {
    let nextcoord = allCoords[i+1];
    if(nextcoord){
      sum += (coord[0] * nextcoord[1]) - (coord[1] * nextcoord[0]);
    }
  });
  return Math.abs(sum/2);
}

console.log(problem(input))

const problem2 = (input) => {
  let dirMap = {'0': 'R', '1': 'D', '2': 'L', '3': 'U'};
  let lines = input.split('\n').filter(x=>x).map(line => {
    let color = line.split(' ')[2].slice(2,-1)
    let dir = dirMap[color.slice(5)];
    let len = parseInt(color.slice(0,5), 16);
    return {dir, len, color}
  });
  let current = [0,0];
  let allCoords = [current];
  let lastOrientationClockwise = 'false';
  lines.forEach((line, i) => {
    //console.log(line)
    let newCurrent = [...current];
    let nextDir = (lines[i+1] || lines[0]).dir;
    let counterclockwise = (line.dir === 'L' && nextDir === 'D') || 
      (line.dir === 'D' && nextDir === 'R') || 
      (line.dir === 'R' && nextDir === 'U') || 
      (line.dir === 'U' && nextDir === 'L');
    let offset = 0;
    if(lastOrientationClockwise && !counterclockwise) offset = 1;
    if(!lastOrientationClockwise && counterclockwise) offset = -1;

    if(line.dir === 'L'){
      newCurrent[0] -= (line.len + offset);
    }
    else if(line.dir === 'R'){
      newCurrent[0] += (line.len + offset);
    }
    else if(line.dir === 'U'){
      newCurrent[1] += (line.len + offset);
    }
    else if(line.dir === 'D'){
      newCurrent[1] -= (line.len + offset);
    }
    //console.log(newCurrent)
    allCoords.push(newCurrent);
    current = newCurrent;
    lastOrientationClockwise = !counterclockwise;
  });
  //console.log(allCoords)
  allCoords.push([0,0]);
  let sum = 0;
  allCoords.forEach((coord, i) => {
    let nextcoord = allCoords[i+1];
    if(nextcoord){
      sum += (coord[0] * nextcoord[1]) - (coord[1] * nextcoord[0]);
    }
  });
  return Math.abs(sum/2);
}


console.log(problem2(input))
