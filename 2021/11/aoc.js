import { input, testInput } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let grid = input.split('\n').map((r) => r.split('').map((x) => {
    return {
      val: Number(x),
      flashed: false,
      adjacents: []
    }
  }));

  let flatGrid = [];
  grid.forEach((r,ri) => {
    r.forEach((c,ci) => {
      for(let i = ri-1; i <= ri+1; i++){
        for(let j=ci-1; j <= ci+1; j++){
          if(i >=0 && i < grid.length &&
            j >=0 && j < r.length &&
            !(i === ri && j === ci)){
            c.adjacents.push(grid[i][j]);
          }
        }
      }
      flatGrid.push(c);
    })
  })

  let flashCount = 0;
  for(let i = 1; i <= 100; i++){
    flatGrid.forEach(x => {
      x.val = x.val+1;
    });
    let over9 = flatGrid.filter(x => x.val > 9);

    while(over9.length && !over9.reduce((a,b) => a && b.flashed, true)){
      over9.forEach(x => {
        if(!x.flashed){
          x.flashed = true;
          flashCount++;
          x.adjacents.forEach(a => a.val = a.val+1);
        }
      });
      over9 = flatGrid.filter(x => x.val > 9);
    }
    over9.forEach(x => {
      x.val = 0;
      x.flashed = false;
    });
  }
  return flashCount
}

console.log(problem(input))

const problem2 = (input) => {
  let grid = input.split('\n').map((r) => r.split('').map((x) => {
    return {
      val: Number(x),
      flashed: false,
      adjacents: []
    }
  }));

  let flatGrid = [];
  grid.forEach((r,ri) => {
    r.forEach((c,ci) => {
      for(let i = ri-1; i <= ri+1; i++){
        for(let j=ci-1; j <= ci+1; j++){
          if(i >=0 && i < grid.length &&
            j >=0 && j < r.length &&
            !(i === ri && j === ci)){
            c.adjacents.push(grid[i][j]);
          }
        }
      }
      flatGrid.push(c);
    })
  })

  let step = 0;
  while(true){
    step++;
    flatGrid.forEach(x => {
      x.val = x.val+1;
    });
    let over9 = flatGrid.filter(x => x.val > 9);

    while(over9.length && !over9.reduce((a,b) => a && b.flashed, true)){
      over9.forEach(x => {
        if(!x.flashed){
          x.flashed = true;
          x.adjacents.forEach(a => a.val = a.val+1);
        }
      });
      over9 = flatGrid.filter(x => x.val > 9);
    }
    over9.forEach(x => {
      x.val = 0;
      x.flashed = false;
    });
    if(over9.length === flatGrid.length){
      break;
    }
  }
  return step
}

console.log(problem2(input))
