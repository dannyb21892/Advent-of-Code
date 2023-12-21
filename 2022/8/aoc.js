import { input } from './input.js';
import { getInputforDay } from '../../get-input.js';
const filePath = import.meta.url;

getInputforDay(input, filePath)

const problem = (input) => {
  let grid = input.split('\n').filter(x=>x).map(x => x.split('').map(Number));
  let visible = 0;
  grid.forEach((row,ri) => {
    row.forEach((tree,ti) => {
      visible += (
        Math.max(...row.slice(0,ti)) < tree ||
        Math.max(...row.slice(ti+1)) < tree ||
        Math.max(...grid.slice(0, ri).map(r => r[ti])) < tree ||
        Math.max(...grid.slice(ri+1).map(r => r[ti])) < tree
      )
    })
  })
  return visible
}

console.log(problem(input))

const problem2 = (input) => {
  let grid = input.split('\n').filter(x=>x).map(x => x.split('').map(Number));
  let highest = 0;
  grid.forEach((row,ri) => {
    row.forEach((tree,ti) => {
      let left = row.slice(0,ti).reverse().slice(0,row.slice(0,ti).reverse().findIndex(x => x >= tree) > -1 ? row.slice(0,ti).reverse().findIndex(x => x >= tree) : Infinity).length;
      if(left !== ti) left += 1;
      if(ti === 0) left = 0;

      let right = row.slice(ti+1).slice(0,row.slice(ti+1).findIndex(x => x >= tree) > -1 ? row.slice(ti+1).findIndex(x => x >= tree) : Infinity).length;
      if(right !== row.slice(ti+1).length) right += 1;
      if(ti === row.length - 1) right = 0;

      let up = grid.slice(0,ri).map(r => r[ti]).reverse().slice(0,grid.slice(0,ri).map(r => r[ti]).reverse().findIndex(x => x >= tree) > -1 ? grid.slice(0,ri).map(r => r[ti]).reverse().findIndex(x => x >= tree) : Infinity).length;
      if(up !== ri) up += 1;
      if(ri === 0) up = 0;

      let down = grid.slice(ri+1).map(r => r[ti]).slice(0,grid.slice(ri+1).map(r => r[ti]).findIndex(x => x >= tree) > -1 ? grid.slice(ri+1).map(r => r[ti]).findIndex(x => x >= tree) : Infinity).length;
      if(down !== row.slice(ri+1).length) down += 1;
      if(ri === grid.length) down = 0;

      let score = left*right*up*down;
      highest = Math.max(highest,score);
    })
  })
  return highest
}

console.log(problem2(input))
