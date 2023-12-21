import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let maxY = 0;
  let minX = 0;
  let maxX = 0;
  let lines = input.split('\n').filter(x=>x).map(x => x.split(' -> ')).map(a => {
    let out = [];
    a.forEach(b => {
      let x = Number(b.split(',')[0]);
      let y = Number(b.split(',')[1]);
      maxY = Math.max(maxY, y);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      out.push({x, y})
    })
    return out;
  });

  let grid = Array(maxY+2).fill().map(x => Array(maxX-minX+2).fill(''));
  lines.forEach(line => {
    for(let i = 1; i < line.length; i++){
      let start = line[i-1];
      let end = line[i];
      if(start.x === end.x){
        let minY = Math.min(start.y, end.y);
        let maxY = Math.max(start.y, end.y);
        for(let y = minY; y <= maxY; y++){
          grid[y][start.x] = '#';
        }
      }
      else if(start.y === end.y){
        let minX = Math.min(start.x, end.x);
        let maxX = Math.max(start.x, end.x);
        for(let x = minX; x <= maxX; x++){
          grid[start.y][x] = '#';
        }
      }
    }
  });
  let done = false;
  let count = 0;
  while(!done){
    let sand = {x: 500, y: 0};
    done = sandTick(sand, grid, maxY, count);
    grid[sand.y][sand.x] = 'o'
    count++;
  }
  return count-1;
}

const sandTick = (sand, grid, maxY, count) => {
  if(sand.y > maxY){
    //console.log(count, '-- abyss')
    return 1;
  }
  if(!grid[sand.y+1][sand.x]){
    //console.log(count, '-- space below, falling')
    sand.y++;
    return sandTick(sand, grid, maxY, count)
  }
  else if(!grid[sand.y+1][sand.x-1]) {
    //console.log(count, '-- space below left, falling')
    sand.y++;
    sand.x--;
    return sandTick(sand, grid, maxY, count)
  }
  else if(!grid[sand.y+1][sand.x+1]){
    //console.log(count, '-- space below right, falling')
    sand.y++;
    sand.x++;
    return sandTick(sand, grid, maxY, count)
  }
  else {
    //console.log(count, '-- no space, stopping')
    return 0;
  }
}

console.log(problem(input))

const problem2 = (input) => {
  let maxY = 0;
  let minX = 0;
  let maxX = 0;
  let lines = input.split('\n').filter(x=>x).map(x => x.split(' -> ')).map(a => {
    let out = [];
    a.forEach(b => {
      let x = Number(b.split(',')[0]);
      let y = Number(b.split(',')[1]);
      maxY = Math.max(maxY, y);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      out.push({x, y})
    })
    return out;
  });

  let grid = Array(maxY+2).fill().map(x => Array(maxX-minX+2).fill(''));
  lines.forEach(line => {
    for(let i = 1; i < line.length; i++){
      let start = line[i-1];
      let end = line[i];
      if(start.x === end.x){
        let minY = Math.min(start.y, end.y);
        let maxY = Math.max(start.y, end.y);
        for(let y = minY; y <= maxY; y++){
          grid[y][start.x] = '#';
        }
      }
      else if(start.y === end.y){
        let minX = Math.min(start.x, end.x);
        let maxX = Math.max(start.x, end.x);
        for(let x = minX; x <= maxX; x++){
          grid[start.y][x] = '#';
        }
      }
    }
  });
  let done = false;
  let count = 0;
  while(!done){
    let sand = {x: 500, y: 0};
    done = sandTick2(sand, grid, maxY);
    grid[sand.y][sand.x] = 'o'
    count++;
  }
  return count;
}

const sandTick2 = (sand, grid, maxY, ticks = 0) => {
  if(sand.y > maxY){
    return 0;
  }
  if(!grid[sand.y+1][sand.x]){
    sand.y++;
    return sandTick2(sand, grid, maxY, ticks+1)
  }
  else if(!grid[sand.y+1][sand.x-1]) {
    sand.y++;
    sand.x--;
    return sandTick2(sand, grid, maxY, ticks+1)
  }
  else if(!grid[sand.y+1][sand.x+1]){
    sand.y++;
    sand.x++;
    return sandTick2(sand, grid, maxY, ticks+1)
  }
  else {
    if(!ticks){
      return 1;
    }
    return 0;
  }
}

console.log(problem2(input))
