import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let start;
  let end;
  let grid = input.split('\n').filter(x=>x).map(
    (x) => x.split('').map((x) => {
        if(x === 'S'){
          start = {
            height: 1,
            dist: Infinity
          }
          return start
        }
        else if(x === 'E'){
          end = {
            height: 26,
            dist: Infinity
          }
          return end;
        }
        else {
          return {
            height: x.charCodeAt(0)-96,
            dist: Infinity
          }
        }
      })
    );
  grid.forEach((row, r) => {
    row.forEach((spot, c) => {
      spot.x = c;
      spot.y = r;
      spot.left = c === 0 ? null : row[c-1];
      spot.right = c === row.length - 1 ? null : row[c+1];
      spot.up = r === 0 ? null : grid[r-1][c];
      spot.down = r === grid.length - 1 ? null : grid[r+1][c];
    })
  });
  let distances = [[start]];
  let done = false;
  let dist = 0;
  while(!done) {
    let nextDist = [];
    distances[dist].forEach((spot) => {
      nextDist = [...new Set([...nextDist, ...([spot.left, spot.right, spot.up, spot.down]).filter(Boolean).filter(x => {
        return x.height <= (spot.height + 1) && x.dist > (dist + 1)
      })])];
      nextDist.forEach(x => x.dist = dist+1);
    })
    distances.push(nextDist);
    if(nextDist.includes(end)){
      done = true
    }
    dist += 1;
  }
  return distances.length - 1;
}

console.log(problem(input))

const problem2 = (input) => {
  let start = [];
  let end;
  let grid = input.split('\n').filter(x=>x).map(
    (x) => x.split('').map((x) => {
        if(x === 'S'){
          let spot = {
            height: 1,
            dist: Infinity
          };
          start.push(spot)
          return spot
        }
        else if(x === 'E'){
          end = {
            height: 26,
            dist: Infinity
          }
          return end;
        }
        else {
          let spot = {
            height: x.charCodeAt(0)-96,
            dist: Infinity
          };
          if(spot.height === 1){
            start.push(spot)
          }
          return spot;
        }
      })
    );
  grid.forEach((row, r) => {
    row.forEach((spot, c) => {
      spot.left = c === 0 ? null : row[c-1];
      spot.right = c === row.length - 1 ? null : row[c+1];
      spot.up = r === 0 ? null : grid[r-1][c];
      spot.down = r === grid.length - 1 ? null : grid[r+1][c];
    })
  });
  let distances = [start];
  let done = false;
  let dist = 0;
  while(!done) {
    let nextDist = [];
    distances[dist].forEach((spot) => {
      nextDist = [...new Set([...nextDist, ...([spot.left, spot.right, spot.up, spot.down]).filter(Boolean).filter(x => {
        return x.height <= (spot.height + 1) && x.dist > (dist + 1)
      })])];
      nextDist.forEach(x => x.dist = dist+1);
    })
    distances.push(nextDist);
    if(nextDist.includes(end)){
      done = true
    }
    dist += 1;
  }
  return distances.length - 1;
}

console.log(problem2(input))
