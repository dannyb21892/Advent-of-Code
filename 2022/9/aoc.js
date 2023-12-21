import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let start = {
    x: 0,
    y: 0,
    visited: 1,
    R: null,
    L: null,
    U: null,
    D: null
  };
  let head = start;
  let tail = start;
  let spots = [start];
  lines.forEach((l, li) => {
    let dir = l[0];
    let dist = Number(l.split(' ')[1])
    for(let i = 1; i <= dist; i++){
      if(dir === 'R'){
        let x = head.x + 1;
        let y = head.y;
        let spot = head.R || spots.find(s => s.x === x && s.y === y);
        if(!spot){
          spot = {
            x, y, visited: 0, L: null, R: null, D: null, U: null
          }
          spots.push(spot);
        }
        spot.L = head;
        head.R = spot;
        if(spot.x > tail.x + 1){
          tail = head;
          tail.visited = 1;
          head = spot;
        }
        else {
          head = spot;
        }
      }
      if(dir === 'L'){
        let x = head.x - 1;
        let y = head.y;
        let spot = head.L || spots.find(s => s.x === x && s.y === y);
        if(!spot){
          spot = {
            x, y, visited: 0, L: null, R: null, D: null, U: null
          }
          spots.push(spot);
        }
        spot.R = head;
        head.L = spot;
        if(spot.x < tail.x - 1){
          tail = head;
          tail.visited = 1;
          head = spot;
        }
        else {
          head = spot;
        }
      }
      if(dir === 'U'){
        let x = head.x;
        let y = head.y + 1;
        let spot = head.U || spots.find(s => s.x === x && s.y === y);
        if(!spot){
          spot = {
            x, y, visited: 0, L: null, R: null, D: null, U: null
          }
          spots.push(spot);
        }
        spot.D = head;
        head.U = spot;
        if(spot.y > tail.y + 1){
          tail = head;
          tail.visited = 1;
          head = spot;
        }
        else {
          head = spot;
        }
      }
      if(dir === 'D'){
        let x = head.x;
        let y = head.y - 1;
        let spot = head.D || spots.find(s => s.x === x && s.y === y);
        if(!spot){
          spot = {
            x, y, visited: 0, L: null, R: null, D: null, U: null
          }
          spots.push(spot);
        }
        spot.U = head
        head.D = spot;
        if(spot.y < tail.y - 1){
          tail = head;
          tail.visited = 1;
          head = spot;
        }
        else {
          head = spot;
        }
      }
    }
  });
  return spots.filter(s => s.visited).length
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n').filter(x=>x);
  let start = {
    x: 0,
    y: 0,
    visited: 1,
  };
  let rope = Array(10).fill(start)
  let spots = [start];
  lines.forEach((l, li) => {
    let dir = l[0];
    let dist = Number(l.split(' ')[1])
    for(let i = 1; i <= dist; i++){
      rope.forEach((knot, k) => {
        let spot;
        let dirMap = {
          R: {x: 1},
          L: {x: -1},
          U: {y: 1},
          D: {y: -1}
        }
        if(k === 0){
          let x = knot.x + (dirMap[dir].x || 0);
          let y = knot.y + (dirMap[dir].y || 0);
          spot = spots.find(s => s.x === x && s.y === y);
          if(!spot){
            spot = {
              x, y, visited: 0,
            }
            spots.push(spot);
          }
          rope[0] = spot;
        }
        else if(k > 0){
          let xdist = rope[k-1].x - knot.x;
          let ydist = rope[k-1].y - knot.y;
          let dist = Math.abs(xdist) + Math.abs(ydist);
          if(dist >= 3 || (dist === 2 && (!xdist || !ydist))){
            spot = spots.find(s => {
              return s.x === knot.x + (xdist/Math.abs(xdist) || 0) &&
                    s.y === knot.y + (ydist/Math.abs(ydist) || 0)
            });
            if(!spot) {
              spot = {
                x: knot.x + (xdist/Math.abs(xdist) || 0),
                y: knot.y + (ydist/Math.abs(ydist) || 0),
                visited: 0,
              };
              spots.push(spot);
            }
            rope[k] = spot;
            if(k === 9){
              rope[k].visited = 1;
            }
          }
        }
      })
    }
  });
  console.log(rope.map((r,i) => 'id: ' + i + ' x: ' + r.x + ' y: ' + r.y))
  console.log([...new Set(spots.map(s => ' x: ' + s.x + ' y: ' + s.y))].length, spots.length)
  return spots.filter(s => s.visited).length
}

console.log(problem2(input))
