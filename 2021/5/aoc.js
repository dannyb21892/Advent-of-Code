import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n');
  lines = lines.map(l => {
    const points = l.split(' -> ');
    const p1 = points[0].split(',')
    const p2 = points[1].split(',')
    return {
      x1: Number(p1[0]),
      y1: Number(p1[1]),
      x2: Number(p2[0]),
      y2: Number(p2[1])
    }
  })
  lines = lines.filter(l => l.x1 === l.x2 || l.y1 === l.y2);

  let points = {};
  lines.forEach((l,i) => {
    if(l.x1 === l.x2){
      const min = Math.min(l.y1, l.y2);
      const max = Math.max(l.y1, l.y2);
      for(let y = min; y <= max; y++){
        const pointName = `${l.x1},${y}`;
        points[pointName] = (points[pointName] ? points[pointName] + 1 : 1);
      }
    }
    else if (l.y1 === l.y2){
      const min = Math.min(l.x1, l.x2);
      const max = Math.max(l.x1, l.x2)
      for(let x = min; x <= max; x++){
        const pointName = `${x},${l.y1}`;
        points[pointName] = (points[pointName] ? points[pointName] + 1 : 1);
      }
    }
  });

  let count = 0;
  Object.entries(points).forEach(([key,val]) => {
    if(val > 1){
      count++;
    }
  })
  return count
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n');
  lines = lines.map(l => {
    const points = l.split(' -> ');
    const p1 = points[0].split(',')
    const p2 = points[1].split(',')
    return {
      x1: Number(p1[0]),
      y1: Number(p1[1]),
      x2: Number(p2[0]),
      y2: Number(p2[1])
    }
  })

  let points = {};
  let printed = false;
  lines.forEach((l,i) => {
    if(l.x1 === l.x2){
      const min = Math.min(l.y1, l.y2);
      const max = Math.max(l.y1, l.y2);
      for(let y = min; y <= max; y++){
        const pointName = `${l.x1},${y}`;
        points[pointName] = (points[pointName] ? points[pointName] + 1 : 1);
      }
    }
    else if (l.y1 === l.y2){
      const min = Math.min(l.x1, l.x2);
      const max = Math.max(l.x1, l.x2)
      for(let x = min; x <= max; x++){
        const pointName = `${x},${l.y1}`;
        points[pointName] = (points[pointName] ? points[pointName] + 1 : 1);
      }
    }
    else if((l.x1 < l.x2 && l.y1 < l.y2) || (l.x1 > l.x2 && l.y1 > l.y2)){
      //positive slope
      const minx = Math.min(l.x1, l.x2);
      const miny = minx === l.x1 ? l.y1 : l.y2;
      const maxx = Math.max(l.x1, l.x2);
      let count = 0;
      for(let x = minx; x <= maxx; x++){
        const pointName = `${x},${miny + count}`;
        count++;
        points[pointName] = (points[pointName] ? points[pointName] + 1 : 1);
      }
    }
    else {
      //negative slope

      const minx = Math.min(l.x1, l.x2);
      const maxx = Math.max(l.x1, l.x2);
      const maxy = minx === l.x1 ? l.y1 : l.y2;

      let count = 0;
      for(let x = minx; x <= maxx; x++){
        const pointName = `${x},${maxy - count}`;
        count++;
        points[pointName] = (points[pointName] ? points[pointName] + 1 : 1);
      }
    }
  });

  let count = 0;
  Object.entries(points).forEach(([key,val]) => {
    if(val > 1){
      count++;
    }
  })
  return count
}

console.log(problem2(input))
