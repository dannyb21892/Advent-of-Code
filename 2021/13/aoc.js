import { input, test } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let lines = input.split('\n\n');
  let dots = lines[0].split('\n').map(x => {
    let coords = x.split(',').map(Number);
    return {
      x: coords[0],
      y: coords[1]
    }
  });

  let folds = lines[1].split('\n').map(x => {
    let fold = x.split(' ')[2].split('=');
    return {
      type: fold[0],
      val: Number(fold[1])
    }
  });

  folds.forEach((f, i) => {
    if(i === 0){
      let foldedDots = dots.filter(d => d[f.type] > f.val);
      foldedDots.forEach(d => {
        d[f.type] = d[f.type] - (2 * (d[f.type] - f.val));
      })
      let newDots = [];
      dots.forEach((d, j) => {
        let existing = newDots.find(x => x.x === d.x && x.y === d.y);
        if(!existing){
          newDots.push(d);
        }
      });
      dots = newDots;
    }
  })
  return dots.length
}

console.log(problem(input))

const problem2 = (input) => {
  let lines = input.split('\n\n');
  let dots = lines[0].split('\n').map(x => {
    let coords = x.split(',').map(Number);
    return {
      x: coords[0],
      y: coords[1]
    }
  });

  let folds = lines[1].split('\n').map(x => {
    let fold = x.split(' ')[2].split('=');
    return {
      type: fold[0],
      val: Number(fold[1])
    }
  });

  folds.forEach((f, i) => {
    let foldedDots = dots.filter(d => d[f.type] > f.val);
    foldedDots.forEach(d => {
      d[f.type] = d[f.type] - (2 * (d[f.type] - f.val));
    })
    let newDots = [];
    dots.forEach((d, j) => {
      let existing = newDots.find(x => x.x === d.x && x.y === d.y);
      if(!existing){
        newDots.push(d);
      }
    });
    dots = newDots;
  })
  let maxX = Math.max(...dots.map(d => d.x));
  let maxY = Math.max(...dots.map(d => d.y));

  let grid = '';

  for(let y = 0; y <= maxY; y++){
    for(let x = 0; x <= maxX; x++){
      let dot = dots.find(d => d.x === x && d.y === y);
      if(dot){
        grid += '#'
      }
      else {
        grid += ' '
      }
    }
    grid += '\n'
  }
  return grid
}

console.log(problem2(input))
